function renderCheckoutCart() {
  const checkoutCartDiv = document.querySelector(".checkout-cart-container");
  let cartTable = "<table>"
  cart.forEach(cartProduct => {
    const product = cartProduct.product;
    const productQuantity = cartProduct.quantity;
    cartTable += `
      <tr>
        <td><img src="images/${product.productImage}" height="30px"></td>
        <td>${product.productName}</td>
        <td><input type="number" value="${productQuantity}" id="cart-qty-${product.id}" readonly></td>
        <td>R${product.productPrice.toFixed(2)}</td>
        <td>R${(productQuantity*product.productPrice).toFixed(2)}</td>
      </tr>
    `
  })
  cartTable += "</table>"
  checkoutCartDiv.innerHTML += cartTable;
}
function renderCheckoutSummary() {
  const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0) || 0;
  try {
    document.querySelector(".checkout-items-in-cart").textContent = itemsInCart;
    document.querySelector(".cart-total-excl-tax").textContent = (cartTotal/1.15).toFixed(2);
    document.querySelector(".cart-total-tax").textContent = ((cartTotal/1.15)*0.15).toFixed(2);
    document.querySelector(".shipping-and-service-fees").textContent = (35).toFixed(2);
    document.querySelector(".cart-total-incl-tax-fees").textContent = (cartTotal+35).toFixed(2);
  } catch (err) {
    //console.error('Error:', err);
  }
}