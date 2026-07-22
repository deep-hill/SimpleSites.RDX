const products = [
      { id: 1, name: "Headphones", price: 99, img: "" },
      { id: 2, name: "Watch", price: 149, img: "" },
      { id: 3, name: "Mouse", price: 49, img: "" },
      { id: 4, name: "Keyboard", price: 120, img: "" }
    ];
    let cart = [];
    function render(filter = "") {
      const filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
      document.getElementById('product-list').innerHTML = filtered.map(p => `
        <div class="card">
          <img src="${p.img}">
          <h3>${p.name}</h3>
          <p>$${p.price}</p>
          <button class="btn" onclick="updateQty(${p.id}, 1)">Add to Cart</button>
        </div>
      `).join('');
    }
    function toggleCart() {
      document.getElementById('drawer').classList.toggle('open');
    }
    function updateQty(id, delta) {
      let item = cart.find(i => i.id === id);
      if (!item && delta > 0) {
        item = { ...products.find(p => p.id === id), qty: 0 };
        cart.push(item);
      }
      if (item) item.qty += delta;
      cart = cart.filter(i => i.qty > 0);
      document.getElementById('cart-count').innerText = cart.reduce((s, i) => s + i.qty, 0);
      document.getElementById('cart-items').innerHTML = cart.map(i => `
        <div class="cart-item">
          <div><b>${i.name}</b><br><small>$${i.price} x ${i.qty}</small></div>
          <div>
            <button onclick="updateQty(${i.id}, -1)">-</button>
            <span>${i.qty}</span>
            <button onclick="updateQty(${i.id}, 1)">+</button>
          </div>
        </div>
      `).join('');
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      document.getElementById('cart-total').innerText = total.toFixed(2);
      document.getElementById('drawer').classList.add('open');
    }
    function openCheckout() {
      if (!cart.length) return alert('Cart is empty!');
      document.getElementById('modal').showModal();
    }
    function processOrder(e) {
      e.preventDefault();
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
      document.getElementById('modal-body').innerHTML = `
        <h2 style="color: #16a34a;">🎉 Order Success!</h2>
        <p><b>Order ID:</b> #${Math.floor(100000 + Math.random() * 900000)}</p>
        <hr style="margin: 0.8rem 0;">
        ${cart.map(i => `<p>${i.name} (x${i.qty}) - $${i.price * i.qty}</p>`).join('')}
        <h3 style="margin-top: 0.8rem;">Total Paid: $${total}</h3>
        <button class="btn" onclick="window.print()">🖨️ Print Receipt (PDF)</button>
        <button class="btn btn-sub" onclick="location.reload()">Close</button>
      `;
      cart = [];
    }
    render();
