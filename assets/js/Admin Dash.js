document.addEventListener("DOMContentLoaded", () => {
    const ordersBody = document.getElementById('orders-body');

    function loadOrders() {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.forEach(order => {
            addOrderToTable(order);
        });
    }

    function updateStatus(button, newStatus) {
        const row = button.parentElement.parentElement;
        const statusCell = row.cells[6];
        statusCell.textContent = newStatus;

        button.textContent = newStatus === 'Completed' ? 'Ubah ke Pending' : 'Ubah ke Selesai';
        button.onclick = () => updateStatus(button, newStatus === 'Completed' ? 'Pending' : 'Completed');

        updateOrderInLocalStorage(row.cells[0].textContent, newStatus);
    }

    function deleteRow(button) {
        const row = button.parentElement.parentElement;
        ordersBody.removeChild(row);
        deleteOrderFromLocalStorage(row.cells[0].textContent);
    }

    function addOrderToTable(order) {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${order.queue}</td>
            <td>${order.pemesanan}</td>
            <td>${order.jenis.join(', ')}</td>
            <td>${order.jumlah}</td>
            <td>${order.harga}</td>
            <td>${order.total}</td>
            <td>${order.status}</td>
            <td>
                <button class="status-btn">${order.status === 'Pending' ? 'Ubah ke Selesai' : 'Ubah ke Pending'}</button>
                <button class="delete-btn">Hapus</button>
            </td>
        `;

        ordersBody.appendChild(row);

        const statusButton = row.querySelector('.status-btn');
        const deleteButton = row.querySelector('.delete-btn');

        statusButton.addEventListener('click', () => {
            const currentStatus = row.cells[6].textContent;
            const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
            updateStatus(statusButton, newStatus);
        });

        deleteButton.addEventListener('click', () => {
            deleteRow(deleteButton);
            updateLastQueueNumber();
        });
    }

    function updateOrderInLocalStorage(queue, newStatus) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders = orders.map(order => {
            if (order.queue === queue) {
                order.status = newStatus;
            }
            return order;
        });
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    function deleteOrderFromLocalStorage(queue) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders = orders.filter(order => order.queue !== queue);
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    function updateLastQueueNumber() {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        let lastQueueNumber = 1;
        if (orders.length > 0) {
            const lastOrder = orders[orders.length - 1];
            lastQueueNumber = parseInt(lastOrder.queue.slice(1)) + 1;
        }
        localStorage.setItem('lastQueueNumber', lastQueueNumber);
    }

    loadOrders();
});
