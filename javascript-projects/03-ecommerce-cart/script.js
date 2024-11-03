document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: "MacBook Air M1", price: 1200.99 },
    { id: 2, name: "iPhone 16 Pro", price: 341.99 },
    { id: 3, name: "Dell Inspiron 15", price: 890.99 },
    { id: 4, name: "OnePlus Nord 2T", price: 280.99 },
  ];

  // Retrieve cart items from local storage or initialize an empty array
  const cart = JSON.parse(localStorage.getItem("cart-items")) || [];

  const productList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart');
  const cartTotalMessage = document.getElementById('cart-total');
  const totalPriceDisplay = document.getElementById('total-price');
  const checkOutBtn = document.getElementById('checkout-btn');

  // Function to render products
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  // Add product to cart and update local storage
  productList.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      addToCart(product);
    }
  });

  // Function to add product to cart
  function addToCart(product) {
    cart.push(product);
    updateLocalStorage();
    renderCart();
  }

  // Function to render cart
  function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length) {
      emptyCartMessage.classList.add('hidden');
      cartTotalMessage.classList.remove('hidden');
      let totalPrice = 0;

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove('hidden');
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  // Function to update local storage
  function updateLocalStorage() {
    localStorage.setItem("cart-items", JSON.stringify(cart));
  }

  // Delete product from cart
  cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      cart.splice(index, 1); // Remove the item at the specified index
      updateLocalStorage();  // Update local storage after deletion
      renderCart();  // Re-render cart to show updated items
    }
  });

  // Checkout and clear cart
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;  // Clear the cart array
    updateLocalStorage();  // Clear cart in local storage
    alert("Checkout successful");
    renderCart();
  });

  // Initial render on page load using saved data
  renderCart();
});
