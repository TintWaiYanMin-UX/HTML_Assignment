document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');

    function updateCartTotal() {
        let subtotal = 0;
        cartItems.querySelectorAll('tr').forEach(row => {
            const price = parseFloat(row.cells[2].textContent.replace('$', ''));
            const quantity = parseInt(row.cells[3].querySelector('input').value, 10);
            const total = price * quantity;
            row.cells[4].textContent = `$${total.toFixed(2)}`;
            subtotal += total;
        });
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        updateTotal(subtotal);
    }

    function updateTotal(subtotal) {
        let shipping = 0;
        shippingOptions.forEach(option => {
            if (option.checked) {
                shipping = parseFloat(option.value);
            }
        });
        const total = subtotal + shipping;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    cartItems.addEventListener('input', updateCartTotal);
    shippingOptions.forEach(option => {
        option.addEventListener('change', () => updateTotal(parseFloat(subtotalElement.textContent.replace('$', ''))));
    });

    cartItems.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            event.target.closest('tr').remove();
            updateCartTotal();
        }
    });

    function checkout() {
        const total = parseFloat(totalElement.textContent.replace('$', ''));
        if (cartItems.querySelectorAll('tr').length === 0) {
            alert('Your cart is empty');
            return;
        }

        alert(`Your total is $${total.toFixed(2)}. Proceeding to checkout...`);

        cartItems.innerHTML = '';

        window.location.href = 'thankyou.html';
    }

    document.getElementById('checkout').addEventListener('click', checkout);

    updateCartTotal();
});
