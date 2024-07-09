document.addEventListener("DOMContentLoaded", () => {
    const queueForm = document.getElementById('queueForm');
    const queueInput = document.getElementById('queueInput');
    const coffeeSelect = document.getElementById('Coffe');
    const nonCoffeeSelect = document.getElementById('Non_coffe');
    const satuanInput = document.getElementById('satuan');
    const hargaInput = document.getElementById('harga');

    let lastQueueNumber = parseInt(localStorage.getItem('lastQueueNumber')) || 1;

    function updateQueueNumber() {
        queueInput.value = `A${lastQueueNumber.toString().padStart(3, '0')}`;
    }

    function saveQueueNumber(queueNumber) {
        localStorage.setItem('lastQueueNumber', queueNumber);
    }

    function calculatePrice() {
        const coffeePrice = {
            "Americano_hot": 12000,
            "Americano_Ice": 10000,
            "Kopsu_hot": 15000,
            "kopsu_ice": 10000,
            "Kopi_gula_aren": 15000,
            "Komel": 15000,
            "Kopi_tubruk_hot": 10000,
            "Espresso": 8000
        };

        const nonCoffeePrice = {
            "Red_velvet": 10000,
            "Taro": 10000,
            "coklat": 10000,
            "Thai_tea": 10000,
            "Green_tea": 10000,
            "Bubblegum": 10000
        };

        let price = 0;

        Array.from(coffeeSelect.selectedOptions).forEach(option => {
            price += coffeePrice[option.value] || 0;
        });

        Array.from(nonCoffeeSelect.selectedOptions).forEach(option => {
            price += nonCoffeePrice[option.value] || 0;
        });

        hargaInput.value = price * (satuanInput.value || 1);
    }

    coffeeSelect.addEventListener('change', calculatePrice);
    nonCoffeeSelect.addEventListener('change', calculatePrice);
    satuanInput.addEventListener('input', calculatePrice);

    function addOrderToLocalStorage(order) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    queueForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedCoffees = Array.from(coffeeSelect.selectedOptions).map(option => option.value);
        const selectedNonCoffees = Array.from(nonCoffeeSelect.selectedOptions).map(option => option.value);

        const order = {
            queue: queueInput.value,
            pemesanan: document.getElementById('pemesanan').value,
            jenis: [...selectedCoffees, ...selectedNonCoffees],
            jumlah: satuanInput.value,
            harga: hargaInput.value,
            total: hargaInput.value * satuanInput.value,
            status: 'Pending'
        };

        addOrderToLocalStorage(order);

        // Update the queue number after a successful submission
        lastQueueNumber++;
        saveQueueNumber(lastQueueNumber);
        updateQueueNumber();

        alert('Pemesanan berhasil disimpan!');
        queueForm.reset();
        hargaInput.value = '';
    });

    updateQueueNumber();
});
