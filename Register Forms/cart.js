let itemCountSpan = document.getElementById('itemCount');
let itemCount = 0;
let cartItems =
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
if (cartItems.length > 0) {
    itemCount = cartItems.map(el => el.quantity).reduce((curr, acc) => acc + curr);
    updateCart();
};

function openCart() {
    modalBody.innerHTML = '';
    cartItems.forEach(item => {
        modalBody.innerHTML += `
        <table class="table">
        <thead>
          <th>Img</th>
          <th>Name</th>
          <th>Price</th>
          <th>Total Price</th>
          <th>Quantity</th>
        </thead>
        <tbody id="tBody">
        <tr id="${item.id}">
          <td>
            <img
          src="${item.img}"
          style="width: 50px; height: 50px"
            />
          </td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td id="total${item.id}">${item.totalPrice}</td>
          <td id="cardQ${item.id}">${item.quantity}</td>
          <td>
            <button class="btn btn-success" onclick="incrementItemQuantity(${item.id})" type="button">+</button>
            <button class="btn btn-danger" onclick="decrementItemQuantity(${item.id})" type="button">-</button>
          </td>
          <td onclick="removeItem(${item.id})" id="remove${item.id}">X</td>
        </tr>
        </tbody>
      </table>
        `;
    })

};

function addToCart(drinkId) {
    const drink = items.find(el => el.id == drinkId);
    const cartDrink = cartItems.find(el => el.id == drinkId);
    if (cartDrink) {
        cartDrink.quantity++;
        cartDrink.totalPrice = (cartDrink.quantity * cartDrink.price).toFixed(2);
    }
    else {
        drink.quantity = 1;
        drink.totalPrice = drink.price;
        cartItems.push(drink);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
};

function updateCart() {
    if(cartItems.length == 0) return;
    modalBody.innerHTML = '';
    itemCount = cartItems.map(el => el.quantity).reduce((curr, acc) => acc + curr);
    itemCountSpan.innerText = itemCount;
};

function incrementItemQuantity(drinkId) {
    let itemQuantity = document.getElementById(`cardQ${drinkId}`);
    let itemTotalPrice = document.getElementById(`total${drinkId}`);
    itemTotalPrice.innerText = ((Number(itemTotalPrice.innerText) / Number(itemQuantity.innerText)) * ++itemQuantity.innerText).toFixed(2);
    updateCartItem(drinkId, itemQuantity.innerText);
};

function decrementItemQuantity(drinkId) {
    let itemQuantity = document.getElementById(`cardQ${drinkId}`);
    let itemTotalPrice = document.getElementById(`total${drinkId}`);
    if (itemQuantity.innerText == 1) return;
    itemTotalPrice.innerText = ((Number(itemTotalPrice.innerText) / Number(itemQuantity.innerText)) * --itemQuantity.innerText).toFixed(2);
    updateCartItem(drinkId, itemQuantity.innerText);
};

function updateCartItem(drinkId, quantity) {
    let drink = cartItems.find(drink => drink.id == drinkId);
    drink.quantity = Number(quantity);
    drink.totalPrice = drink.price * Number(quantity);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
};

function removeItem(drinkId) {
    cartItems = cartItems.filter(drink => drink.id != drinkId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
    openCart();
};