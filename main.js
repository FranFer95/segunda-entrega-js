// cart.js

// Selecciona el formulario, el contenedor del carrito y el botón de vaciar carrito
const form = document.getElementById('product-form');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const clearCartButton = document.getElementById('clear-cart');

// Carga el carrito desde localStorage o inicialízalo vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito en el DOM
function updateCart() {
    // Limpia el carrito en el DOM
    cartItems.innerHTML = '';

    // Calcula el total
    let total = 0;

    // Añade los artículos al carrito en el DOM
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);

        // Suma el precio al total
        total += item.price;
    });

    // Actualiza el precio total en el DOM
    totalPriceElement.textContent = total.toFixed(2);

    // Guarda el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Maneja el envío del formulario
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Obtiene los datos del formulario
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);

    // Añade el artículo al carrito
    cart.push({ name, price });

    // Resetea el formulario
    form.reset();

    // Actualiza el carrito en el DOM
    updateCart();
});

// Maneja el clic en el botón de vaciar carrito
clearCartButton.addEventListener('click', () => {
    // Vacía el carrito
    cart = [];

    // Limpia el carrito en el DOM
    cartItems.innerHTML = '';

    // Resetea el precio total
    totalPriceElement.textContent = '0';

    // Elimina el carrito de localStorage
    localStorage.removeItem('cart');
});
 
// Inicializa el carrito al cargar la página
updateCart();
