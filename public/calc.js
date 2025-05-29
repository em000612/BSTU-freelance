const calculateButton = document.querySelector('.calculator-form-button');
const selectedService = document.getElementById('selected-Service');
const orderPriceInput = document.getElementById('order-price');
const calculatedOutputContainer = document.querySelector('.calculator-text-field-readonly');

function calculatePrice() {
    const service = selectedService.value;
    const price = parseFloat(orderPriceInput.value);

    if (!service || isNaN(price)) return;

    const priceForDelivery = calculateRange(price, service);
    const isFree = priceForDelivery === 'Free';
    calculatedOutputContainer.value = isFree ? priceForDelivery : (price * priceForDelivery).toFixed(2) + ' rub.';
}

function calculateRange(price, service) {
    const free = 'Free';

    switch (service) {
        case 'economic':
            return price > 20 ? free : 150;
        case 'IT': {
            if (price > 30) return free;
            if (price >= 35 && price <= 50) return 100;
            if (price < 35) return 170;
            return null;
        }
    }
}

calculateButton.onclick = calculatePrice;

function replaceNonNumbers() {
    orderPriceInput.value = orderPriceInput.value.replace(/\D+/g, '');
}
orderPriceInput.addEventListener('input', replaceNonNumbers);
