const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. YOUR PRODUCT DATABASE
const products = [
    { id: 1, name: "Nike Air Max", description: "Lightweight running shoes.", price: 25000, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { id: 2, name: "Apple Watch Series 9", description: "Advanced health features.", price: 450000, category: "Electronics", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400" },
    { id: 3, name: "Sony WH-1000XM5", description: "Noise canceling headphones.", price: 320000, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { id: 4, name: "Samsung Galaxy S24 Ultra", description: "AI-powered smartphone.", price: 1200000, category: "Electronics", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400" },
    { id: 5, name: "Classic Leather Jacket", description: "Premium black leather.", price: 55000, category: "Fashion", image: "https://images.unsplash.com/photo-1551028711-031c1f062497?w=400" },
    { id: 6, name: "Minimalist Coffee Table", description: "Modern wooden table.", price: 75000, category: "Home Goods", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400" }
];

// 2. THE WEBSITE INTERFACE
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trend Hub | Online Store</title>
        <script src="https://js.paystack.co/v2/inline.js"></script>
        <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 0; background: #f9f9f9; color: #333; }
            header { background: #111; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
            .cart-count-bg { background: #e44d26; color: white; padding: 2px 10px; border-radius: 15px; font-size: 0.8em; }
            nav { display: flex; justify-content: center; gap: 20px; background: #222; padding: 10px; }
            nav a { color: #aaa; text-decoration: none; font-size: 0.9em; }
            .container { max-width: 1200px; margin: 30px auto; padding: 0 20px; }
            .filter-container { margin-bottom: 30px; text-align: center; }
            .filter-btn { background: white; border: 1px solid #ddd; padding: 8px 18px; margin: 5px; cursor: pointer; border-radius: 20px; }
            .filter-btn.active { background: #111; color: white; }
            .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
            .card { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); text-align: center; }
            .card img { width: 100%; height: 200px; object-fit: cover; border-radius: 5px; }
            .price { font-weight: bold; color: #e44d26; font-size: 1.2em; margin: 10px 0; }
            .btn { background: #111; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; width: 100%; font-weight: bold; }
            #cart-sidebar { display: none; position: fixed; right: 0; top: 0; width: 300px; height: 100%; background: white; box-shadow: -5px 0 15px rgba(0,0,0,0.1); z-index: 200; padding: 20px; }
        </style>
    </head>
    <body>

        <header>
            <h2 style="margin:0">TREND HUB</h2>
            <div style="cursor:pointer" onclick="toggleCart()">🛒 Cart <span class="cart-count-bg" id="cart-count">0</span></div>
        </header>

        <nav>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">About Us</a>
        </nav>

        <div id="cart-sidebar">
            <h3>Your Bag <span style="float:right; cursor:pointer" onclick="toggleCart()">×</span></h3>
            <div id="cart-items" style="margin-bottom: 20px;"></div>
            <hr>
            <p><strong>Total: ₦ <span id="cart-total">0</span></strong></p>
            <input type="email" id="customer-email" placeholder="Email for receipt" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd;">
            <button class="btn" style="background:#28a745" onclick="payNow()">Checkout Now</button>
        </div>

        <div class="container">
            <div class="filter-container">
                <button class="filter-btn active" onclick="filterItems('all')">All</button>
                <button class="filter-btn" onclick="filterItems('Fashion')">Fashion</button>
                <button class="filter-btn" onclick="filterItems('Electronics')">Electronics</button>
            </div>

            <div class="products-grid">
                ${products.map(p => `
                    <div class="card product-card" data-cat="${p.category}">
                        <img src="${p.image}">
                        <p style="font-size:0.7em; color:#999; text-transform:uppercase; margin-top:10px;">${p.category}</p>
                        <h3>${p.name}</h3>
                        <div class="price">₦ ${p.price.toLocaleString()}</div>
                        <button class="btn" onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
                    </div>
                `).join('')}
            </div>
        </div>

        <script>
            let cart = [];
            
            function filterItems(cat) {
                const cards = document.querySelectorAll('.product-card');
                cards.forEach(c => {
                    c.style.display = (cat === 'all' || c.getAttribute('data-cat') === cat) ? 'block' : 'none';
                });
            }

            function addToCart(name, price) {
                cart.push({name, price});
                document.getElementById('cart-count').innerText = cart.length;
                renderCart();
                document.getElementById('cart-sidebar').style.display = 'block';
            }

            function renderCart() {
                const list = document.getElementById('cart-items');
                list.innerHTML = cart.map(i => \`<div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span>\${i.name}</span><span>₦\${i.price.toLocaleString()}</span></div>\`).join('');
                const total = cart.reduce((s, i) => s + i.price, 0);
                document.getElementById('cart-total').innerText = total.toLocaleString();
            }

            function toggleCart() {
                const s = document.getElementById('cart-sidebar');
                s.style.display = s.style.display === 'block' ? 'none' : 'block';
            }

            function payNow() {
                const email = document.getElementById('customer-email').value;
                const total = cart.reduce((s, i) => s + i.price, 0);
                if(!email) return alert("Please enter your email");
                
                const handler = new PaystackPop();
                handler.newTransaction({
                    key: 'pk_test_3899324fac7b348ffd8250cddc24b4095487c90d', // YOUR KEY
                    email: email,
                    amount: total * 100,
                    onSuccess: (transaction) => {
                        alert('Payment Success! Ref: ' + transaction.reference);
                        cart = [];
                        location.reload();
                    }
                });
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});