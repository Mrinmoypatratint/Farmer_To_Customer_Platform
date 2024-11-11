// Function to add items to the cart
function addToCart(button) {
    const productElement = button.parentElement;
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = cart.find(item => item.name === productName);

    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart.`);
}

// Function to load and display cart items on the cart page
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        cartItemsElement.appendChild(row);
    });

    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity, 10);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Function to remove an item from the cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Function for checkout (placeholder for actual implementation)
function checkout() {
    alert('Proceeding to checkout');
    // Integrate this with a payment gateway or checkout page
}

// Load cart items when the cart page is loaded
document.addEventListener('DOMContentLoaded', loadCartItems);
