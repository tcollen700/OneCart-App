class Product {
  static #count = 0;
  static category = {
    "cat01": "Appliances",
    "cat02": "Baby Products",
    "cat03": "Bakery",
    "cat04": "Meat & Seafood",
    "cat05": "Dairy & Eggs",
    "cat06": "Frozen Foods",
    "cat07": "Fruits & Vegetables",
    "cat08": "Canned Goods",
    "cat09": "Snacks",
    "cat10": "Fizzy Drinks",
    "cat11": "Cleaning Supplies",
    "cat12": "Personal Care",
    "cat13": "Cereal & Porridge",
    "cat14": "Pasta, Rice & Grains",
    "cat15": "Sauces, Mayonnaise & Pickles",
    "cat16": "Stationery",
    "cat17": "Spreads & Jam",
    "cat18": "Alcohol & Tobacco",
    "cat19": "Baking & Cooking Ingredients",
    "cat20": "Breakfast Foods",
    "cat21": "Candy & Chocolate",
    "cat22": "Coffee & Tea",
    "cat23": "Cooked Foods & Deli",
    "cat24": "Cosmetics & Beauty",
    "cat25": "Electronics & Gadgets",
    "cat26": "Household Essentials",
    "cat27": "Ice Cream & Desserts",
    "cat28": "Sugar & Sweeteners",
    "cat29": "Kitchenware & Utensils",
    "cat30": "Laundry & Dishwashing",
    "cat31": "Medicines & Health",
    "cat32": "Nuts & Dried Fruits",
    "cat33": "Oils & Vinegars",
    "cat34": "Pet Food & Supplies",
    "cat35": "Ready-to-Eat Meals",
    "cat36": "Spices & Seasonings",
    "cat37": "Toilet Paper & Tissue",
    "cat38": "Water & Juices",
    "cat39": "Wine & Spirits"
  };

  constructor(productName, productImage, productPrice, productQuantity, productCategory) {
    this.id = Product.#count++;
    this.productName = productName;
    this.productImage = productImage;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity;
    this.productCategory = productCategory.map(
      categoryCode => Product.category[categoryCode]
    );
  }
  
  static getNumberOfProducts() {
    return this.#count;
  }
}

let cart = [];
let cartTotal = 0;
const products = [
new Product("Sasko Bread Everyday Brown 700g", "sasko-bread-everyday.webp", 18.99, 100, ["cat03"]),
new Product("Cadbury Lunch Bar 48g", "CADBURY-LUNCH-BAR-48G.webp", 12.99, 100, ["cat21"]),
new Product("Sasko Bread Premium White 700g", "sasko-bread-premium.webp", 20.99, 100, ["cat03"]),
new Product("Coca-cola Coke Original 2lt", "Coke-Original-Bottle-2lt.webp", 27.99, 100, ["cat10"]),
new Product("Salati Pure White Sugar 10Kg", "selati-white-sugar-10kg.webp", 239.99, 100, ["cat22","cat28", "cat19"]),
new Product("Helios Cooking oil 5lt", "HELIOS-OIL-5LT.webp", 127.99, 100, ["cat33"]),
  new Product("Enrista Instant Cappuccino Regular 10×12", "Enrista-Instant-Cappuccino-Regular-10x12g.webp", 59.99, 100,["cat22"]),
  new Product("Lucky Star Pilchards In Tomato Sauce 410g", "Lucky-star-pilchards-in-tomato-sauce-410g.webp", 24.99, 100, ["cat08"]),
  new Product("Rainbow Frozen Chicken Mixed Portions 2KG", "RAINBOW-FROZEN-CHICKEN-MIXED-PORTIONS-2KG.webp", 109.99, 100, ["cat06", "cat04"]),
  new Product("Simba-Creamy Cheddar Flavour Potato Chips 120g", "simba-creamy-cheddar-flavour-potato-chips-120g.webp", 21.99, 100, ["cat09"])
];


const savedCart = localStorage.getItem('cart');
if (savedCart) {
  cart = JSON.parse(savedCart);
  cartTotal = parseFloat(localStorage.getItem('cartTotal'));
  updateCartDisplay();
  renderCartDetails();
}
//console.log(cart);

//console.log(products)

function renderProducts() {
  let renderedProducts = "";
  const selectedCategories = getSelectedCategories();
  //filters products by search keywords
  const filteredProductsBySearch = searchProducts(products);
  //fiters products by category(selected categories)
  sortedProducts = sortProducts(filteredProductsBySearch ||products);
  const newProducts = sortedProducts.filter(product => 
  product.productCategory.some(category => 
    selectedCategories.includes(category)
    )
  );
  
  let displayProducts = [...sortedProducts];
  if (newProducts.length > 0){
    displayProducts = [...newProducts];
  }
  
  
  //displays massages, if no items are found
  if (newProducts.length == 0 && selectedCategories.length > 1 ) {
    renderedProducts += `<p>Showing ${newProducts.length} products</p>`
    renderedProducts += "<p>No items found from ";
    
    for (let i = 1; i < selectedCategories.length; i++){
      if (i===selectedCategories.length-1){
        renderedProducts += selectedCategories[i] + ".</br></br>More products coming soon, feel free to suggest products to be added using our contact form.<br>Thank you for your understanding.</p>"
      }
      else{
        renderedProducts += selectedCategories[i] + ", "
      }
    }
  }
  else{
    renderedProducts += `<p>Showing ${displayProducts.length} products</p>`
    displayProducts.forEach(product => {
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
      //console.log(product.productCategory)
    });
  }
  document.querySelector(".products-grid").innerHTML = renderedProducts;
}

function updateCartDisplay() {
  const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0) || 0;
  try {
    document.querySelector(".cart-items-count").textContent = itemsInCart;
    document.querySelector(".cart-container-summary-items-count").textContent = itemsInCart;
    document.querySelector(".header-cart-total span, .cart-container-summary-total").textContent = cartTotal.toFixed(2);
    document.querySelector(".cart-container-summary-total").textContent = cartTotal.toFixed(2);
  } catch (err) {
    //console.error('Error:', err);
  }
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
  const cartProduct = cart.find(cartProduct => cartProduct.product.id === product.id)
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
        <td><input type="number" value="${productQuantity}" id="cart-qty-${product.id}"></td>
        <td>R${product.productPrice.toFixed(2)}</td>
        <td>R${(productQuantity*product.productPrice).toFixed(2)}</td>
      </tr>
    `
  })
  cartTable += "</table>"
  if (cart.length > 0) {
    try {
      document.querySelector(".cart-container-table").innerHTML = cartTable;
    } catch (err) {
      //console.error('Error:', err);
    }
  }
  else {
    document.querySelector(".cart-container-table").innerHTML = `<p class="cart-container-p">Cart is empty</p>`;
  }
  document.querySelector(".cart-container-table").innerHTML += `
  <svg class="close-cart" onclick="showOrHideCart()" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" stroke-width="0.8" stroke="#1d57cbff"/></svg>
  `
  SaveCart();
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
//adjusting item quantity in cart
function updateQuantityInCart() {
  cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];
    const productId = cartItem.product.id;
    const newQuantity = parseInt(document.querySelector(`#cart-qty-${productId}`).value);

    //If quantity is invalid or zero, remove the item
    if (isNaN(newQuantity) || newQuantity <= 0) {
      cart.splice(i, 1);
      continue;
    }

    // Update quantity
    cartItem.quantity = newQuantity;

    // Recalculate total
    cartTotal += cartItem.product.productPrice * newQuantity;
  }

  // Update the display
  updateCartDisplay();
  renderCartDetails();
}
function clearCart() {
  cart = []
  cartTotal = 0;
  updateCartDisplay();
  renderCartDetails();
}
//save cart data on localstorage
function SaveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
localStorage.setItem('cartTotal', cartTotal.toString());
}