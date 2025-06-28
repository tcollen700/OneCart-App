class Product {
  static #count = 0;
  constructor(productName, productImage, productPrice, productQuantity) {
    this.id = Product.#count++;
    this.productName = productName;
    this.productImage = productImage;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity;
  }
  
  static getNumberOfProducts() {
    return this.#count;
  }
}

const cart = []; 
let cartTotal = 0;
const products = [
new Product("Sasko Bread Everyday Brown 700g", "sasko-bread-everyday.webp", 18.99, 100),
new Product("Cadbury Lunch Bar 48g", "CADBURY-LUNCH-BAR-48G.webp", 12.99, 100),
new Product("Sasko Bread Premium White 700g", "sasko-bread-premium.webp", 20.99, 100),
new Product("Coca-cola Coke Original 2lt", "Coke-Original-Bottle-2lt.webp", 27.99, 100),
new Product("Salati Pure White Sugar 10Kg", "selati-white-sugar-10kg.webp", 239.99, 100),
new Product("Helios Cooking oil 5lt", "HELIOS-OIL-5LT.webp", 127.99, 100),
  new Product("Enrista Instant Cappuccino Regular 10×12", "Enrista-Instant-Cappuccino-Regular-10x12g.webp", 59.99, 100),
  new Product("Lucky Star Pilchards In Tomato Sauce 410g", "Lucky-star-pilchards-in-tomato-sauce-410g.webp", 24.99, 100),
  new Product("Rainbow Frozen Chicken Mixed Portions 2KG", "RAINBOW-FROZEN-CHICKEN-MIXED-PORTIONS-2KG.webp", 109.99, 100),
  new Product("Simba-Creamy Cheddar Flavour Potato Chips 120g", "simba-creamy-cheddar-flavour-potato-chips-120g.webp", 21.99, 100)
];

//console.log(products)

function renderProducts() {
  let renderedProducts = "";
  products.forEach(product => {
    renderedProducts += `
    <div class="product" data-id="${product.id}">
        <div class="product-image">
          <img src="images/${product.productImage}">
        </div>
        
        <div class="product-info">
          <p>${product.productName}</p>
          <strong>R<span class="product-price">${product.productPrice.toFixed(2)}</span></strong>
          <button class="add-to-cart-button" onclick="addToCart(${product.id})">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6h19l-3 10H6zm0 0l-.75-2.5M9.992 11h2m2 0h-2m0 0V9m0 2v2M11 19.5a1.5 1.5 0 0 1-3 0m9 0a1.5 1.5 0 0 1-3 0" /></svg>
          </button>
          
          <div class="product-quantity">
            <button onclick="adjustQuantity(${product.id}, -1)">-</button>
            <input type="number" id="qty-${product.id}" value="1" min="1">
            <button onclick="adjustQuantity(${product.id}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  });
  document.querySelector(".products-grid").innerHTML = renderedProducts;
}

function updateCartDisplay() {
  const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0) || 0;
  document.querySelector(".cart-items-count").textContent = itemsInCart;
  document.querySelector(".cart-container-summary-items-count").textContent = itemsInCart;
  document.querySelector(".header-cart-total span, .cart-container-summary-total").textContent = cartTotal.toFixed(2);
  document.querySelector(".cart-container-summary-total").textContent = cartTotal.toFixed(2);
}

function addToCart(productId) {
  const quantityInput = document.querySelector(`#qty-${productId}`);
  const quantity = parseInt(quantityInput.value);
  
  if (quantity < 1) return;
  //finds the product using product id from the products array
  const product = products.find(product => product.id === productId);
  if (!product) return;
  //console.log(product)
  
  // Check if product already in cart
  const cartProduct = cart.find(cartProduct => cartProduct.product === product)
  //console.log(cartProduct)
  
  if (cartProduct) {
    cartProduct.quantity += quantity;
    //console.log("is in cart");
  } else {
    cart.push({ product, quantity });
    //console.log("Not in cart")
  }
  //console.log(cart)
  // Update total
  cartTotal += product.productPrice * quantity;
  updateCartDisplay();
  renderCartDetails()
}
//Fuction + and - buttons to adjust the qty input field
function adjustQuantity(productId, change) {
  const quantityInput = document.querySelector(`#qty-${productId}`);
  let newValue = parseInt(quantityInput.value) + change;
  if (newValue < 1) newValue = 1;
  quantityInput.value = newValue;
}

//Display products add to cart
function renderCartDetails(){
  let cartTable = "<table>"
  cart.forEach(cartProduct => {
    const product = cartProduct.product;
    const productQuantity = cartProduct.quantity;
    cartTable += `
      <tr>
        <td><img src="images/${product.productImage}" height="30px"></td>
        <td>${product.productName}</td>
        <td>${productQuantity}</td>
        <td>R${product.productPrice.toFixed(2)}</td>
        <td>R${(productQuantity*product.productPrice).toFixed(2)}</td>
      </tr>
    `
  })
  cartTable += "</table>"
  if (cart.length > 0) {
  document.querySelector(".cart-container-table").innerHTML = cartTable;
  }
  else {
    document.querySelector(".cart-container-table").innerHTML = `<p class="cart-container-p">Cart is empty</p>`;
  }
}
//show or hide cart
function showOrHideCart() {
  cartContainerElement = document.querySelector(".cart-container");
  if (cartContainerElement.hidden === true) {
    cartContainerElement.hidden = false;
  }else {
    cartContainerElement.hidden = true;
  }
  renderCartDetails();
}