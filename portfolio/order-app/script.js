// script.js
const menu = [
    { id: 1, name: 'Burger', price: 5.99 },
    { id: 2, name: 'Pizza', price: 8.99 },
    { id: 3, name: 'Salad', price: 4.99 },
    { id: 4, name: 'Fries', price: 2.99 },
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayMenu();
});

function displayMenu() {
    const menuContainer = document.getElementById('menu');
    
    menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="btn btn-success" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuContainer.appendChild(menuItem);
    });
}

function addToCart(itemId) {
    const selectedItem = menu.find(item => item.id === itemId);

    if (selectedItem) {
        const existingCartItem = cart.find(item => item.id === itemId);

        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            cart.push({ ...selectedItem, quantity: 1 });
        }

        updateCart();
    }
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    // Display current cart items
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item cart-item';
        cartItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalElement.textContent = total.toFixed(2);

    // Show/hide cart based on its content
    cartContainer.style.display = cart.length > 0 ? 'block' : 'none';
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function checkout() {
    alert('Order placed successfully! Thank you for your purchase.');
    cart = [];
    updateCart();
}
