document.addEventListener('DOMContentLoaded', () => {
    let products = [
      { id : 1, name: "Product 1",price : 18.99},
      { id : 2, name: "Product 2",price : 28.99},
      { id : 3, name: "Product 3",price : 38.99},
    ]
    const cart = []
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items")
    const emptyCartMessage = document.getElementById("empty-cart")
    const totalCartMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
      <span>${product.name} - ${product.price.toFixed(2)}</span>
      <button data-id = "${product.id}"> Add to Cart </button> 
      `
      productList.appendChild(productDiv);
    }) 

    productList.addEventListener('click', (event) => {
      if ( event.target.tagName === 'BUTTON'){
        const productId = parseInt(event.target.getAttribute('data-id'));
        const product = products.find( p => (p.id === productId))
        addToCart(product);
      }
    })
    function addToCart(product){
      cart.push(product);
      renderCart(cart);
    }
    function renderCart(){
      cartItems.innerText = "";
      let totalPrice = 0;
      if (cart.length) {
        emptyCartMessage.classList.add('hidden');
        totalCartMessage.classList.remove("hidden");
        cart.forEach((item,index) => {
          totalPrice += item.price;
          const cartItem = document.createElement('div');
          cartItem.innerHTML = `
          ${item.name} - ${item.price.toFixed(2)}
          `
          cartItems.appendChild(cartItem);
          totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        })
      }else{
        emptyCartMessage.classList.remove("hidden");
        totalPriceDisplay.textContent = `$0.00`
      }
    }
    checkOutBtn.addEventListener('click', () =>{
      cart.length = 0;
      alert("CheckOut Successfully");
      renderCart()
    })
})