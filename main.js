// Selecciona los elementos del DOM
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-precio');
const clearCartButton = document.getElementById('clear-cart');
const finalizePurchaseButton = document.getElementById('finalize-purchase');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartSection = document.getElementById('cart-section');

// Array de productos disponibles
const products = [
    { id: 1, name: 'Buzo', precio: 25000 },
    { id: 2, name: 'Remera', precio: 15000 },
    { id: 3, name: 'Pantalón', precio: 35000 },
    { id: 4, name: 'Short', precio: 20000 }
];

// Carrito cargado desde localStorage o inicializado vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para renderizar la lista de productos disponibles
function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `
            ${product.name} - $${product.precio.toFixed(2)}
            <button data-id="${product.id}" class="add-to-cart">Añadir al Carrito</button>
        `;
        productList.appendChild(li);
    });
}

// Función para actualizar el carrito en el DOM
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            ${item.name} - $${item.precio.toFixed(2)} x ${item.quantity}
            <button data-id="${item.id}" class="increase-quantity">+</button>
            <button data-id="${item.id}" class="decrease-quantity">-</button>
            <button data-id="${item.id}" class="remove-item">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.precio * item.quantity;
        count += item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
    cartCount.textContent = count;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Clic en los botones de añadir al carrito
productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.dataset.id);
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
    }
});

// Click de incrementar/decrementar cantidad y eliminar
cartItems.addEventListener('click', (event) => {
    const productId = parseInt(event.target.dataset.id);
    const cartItem = cart.find(item => item.id === productId);

    if (event.target.classList.contains('increase-quantity')) {
        cartItem.quantity++;
    } else if (event.target.classList.contains('decrease-quantity')) {
        cartItem.quantity = Math.max(1, cartItem.quantity - 1);
    } else if (event.target.classList.contains('remove-item')) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCart();
});

// Maneja el clic en el botón de vaciar carrito
clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});

// Maneja el clic en el botón de finalizar compra
finalizePurchaseButton.addEventListener('click', () => {
    alert('Compra finalizada. ¡Gracias por tu compra!');
    cart = [];
    updateCart();
});

// Maneja el clic en el ícono del carrito para mostrar/ocultar el carrito
cartIcon.addEventListener('click', () => {
    cartSection.classList.toggle('active');
});

// Inicializa la página
renderProducts();
updateCart();
