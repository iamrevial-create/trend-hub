const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. MEGA PRODUCT DATABASE (Fashion, Electronics, Home Appliances, Accessories)
const products = [
    // --- FASHION & SHOES ---
    { id: 1, name: "Nike Air Max 270", price: 85000, cat: "Fashion", desc: "Premium comfort and athletic style.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { id: 2, name: "Designer Leather Tote", price: 45000, cat: "Fashion", desc: "Genuine Italian leather handbag.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
    { id: 3, name: "Classic Timberland Boots", price: 95000, cat: "Fashion", desc: "Waterproof durability for any weather.", img: "https://images.unsplash.com/photo-1520639889456-749444397334?w=400" },
    { id: 4, name: "Silk Evening Gown", price: 35000, cat: "Fashion", desc: "Elegant fit for special occasions.", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },

    // --- ELECTRONICS ---
    { id: 5, name: "iPhone 15 Pro Max", price: 1850000, cat: "Tech", desc: "Titanium design, A17 Pro chip.", img: "https://images.unsplash.com/photo-1695048133142-1a20484d256e?w=400" },
    { id: 6, name: "MacBook Pro M3", price: 2400000, cat: "Tech", desc: "The most advanced chip in a laptop.", img: "https://images.unsplash.com/photo-1517336714460-4c504974f231?w=400" },
    { id: 7, name: "Sony WH-1000XM5", price: 350000, cat: "Tech", desc: "Industry-leading noise cancellation.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },

    // --- HOME APPLIANCES ---
    { id: 8, name: "Smart Air Fryer (5L)", price: 85000, cat: "Home", desc: "Healthy cooking with touch controls.", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400" },
    { id: 9, name: "Nespresso Coffee Maker", price: 120000, cat: "Home", desc: "Barista-quality coffee at home.", img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400" },
    { id: 10, name: "Robot Vacuum Cleaner", price: 210000, cat: "Home", desc: "Automatic cleaning with laser mapping.", img: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=400" },

    // --- VALUABLE ACCESSORIES ---
    { id: 11, name: "Gold Plated Watch", price: 150000, cat: "Luxury", desc: "Luxury timepiece for any outfit.", img: "https://images.unsplash.com/photo-1524592093055-3a3179246f41?w=400" },
    { id: 12, name: "Ray-Ban Aviators", price: 75000, cat: "Luxury", desc: "Iconic sunglasses with UV protection.", img: "https://images.unsplash.com/photo-1511499767390-a73359580bc1?w=400" }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trend Hub | All-In-One Store</title>
        <script src="https://js.paystack.co/v2/inline.js"></script>
        <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 0; background: #f0f2f5; }
            header { background: #1a1a1a; color: white; padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; }
            .auth-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 2000; }
            .auth-card { background: white; padding: 30px; border-radius: 12px; width: 90%; max-width: 400px; text-align: center; }
            .nav-tabs { display: flex; overflow-x: auto; background: white; padding: 10px 5%; border-bottom: 1px solid #ddd; }
            .tab { padding: 8px 20px; margin-right: 10px; background: #eee; border-radius: 20px; cursor: pointer; white-space: nowrap; font-size: 14px; }
            .tab.active { background: #000; color: white; }
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; padding: 20px 5%; }
            .card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: 0.3s; cursor: pointer; }
            .card:hover { transform: translateY(-5px); }
            .card img { width: 100%; height: 200px; object-fit: cover; }
            .info { padding: 15px; }
            .price { font-size: 18px; color: #e44d26; font-weight: bold; }
            #sidebar { display: none; position: fixed; right: 0; top: 0; width: 350px; height: 100%; background: white; z-index: 1500; padding: 25px; box-shadow: -5px 0 20px rgba(0,0,0,0.3); overflow-y: auto; }
            input, select { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 6px; }
            .btn { width: 100%; padding: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
            .buy-btn { background: #000; color: white; margin-top: 10px; }
            .pay-btn { background: #28a745; color: white; font-size: 18px; }
            .hidden { display: none; }
        </style>
    </head>
    <body>

        <div id="auth-gate" class="auth-overlay">
            <div class="auth-card">
                <h2 id="gate-title">Welcome to Trend Hub</h2>
                <p>Sign up to start shopping</p>
                <input type="email" id="u-email" placeholder="Email Address">
                <input type="password" id="u-pass" placeholder="Password">
                <button class="btn buy-btn" onclick="login()">Enter Store</button>
            </div>
        </div>

        <header>
            <h1 style="margin:0; letter-spacing:1px;">TREND HUB</h1>
            <button onclick="toggleCart()" style="background:#e44d26; color:white; border:none; padding:10px 20px; border-radius:30px; cursor:pointer;">
                🛒 Cart (<span id="cart-count">0</span>)
            </button>
        </header>

        <div class="nav-tabs">
            <div class="tab active" onclick="filter('All')">All Products</div>
            <div class="tab" onclick="filter('Fashion')">Fashion & Bags</div>
            <div class="tab" onclick="filter('Tech')">Electronics</div>
            <div class="tab" onclick="filter('Home')">Appliances</div>
            <div class="tab" onclick="filter('Luxury')">Valuables</div>
        </div>

        <div class="grid" id="product-grid">
            </div>

        <div id="sidebar">
            <h2>Your Order <span style="float:right; cursor:pointer" onclick="toggleCart()">×</span></h2>
            <div id="cart-items" style="margin: 20px 0;"></div>
            <p style="font-size: 20px;"><strong>Total: ₦<span id="cart-total">0</span></strong></p>
            <hr>
            <h3>Checkout Details</h3>
            <input type="text" id="order-name" placeholder="Receiver Name">
            <input type="text" id="order-addr" placeholder="Delivery Address">
            <input type="tel" id="order-phone" placeholder="WhatsApp Phone Number">
            <button class="btn pay-btn" onclick="checkout()">Proceed to Payment</button>
        </div>

        <script>
            const db = ${JSON.stringify(products)};
            let cart = [];
            let currentEmail = "";
            const MY_WA = "2348000000000"; // REPLACE WITH YOUR NUMBER

            function login() {
                const em = document.getElementById('u-email').value;
                if(!em.includes('@')) return alert("Please enter a valid email");
                currentEmail = em;
                document.getElementById('auth-gate').classList.add('hidden');
                renderProducts('All');
            }

            function renderProducts(cat) {
                const grid = document.getElementById('product-grid');
                const filtered = cat === 'All' ? db : db.filter(p => p.cat === cat);
                grid.innerHTML = filtered.map(p => \`
                    <div class="card" onclick="alert('\${p.name}\\n\\n\${p.desc}')">
                        <img src="\${p.img}">
                        <div class="info">
                            <h4>\${p.name}</h4>
                            <div class="price">₦\${p.price.toLocaleString()}</div>
                            <button class="btn buy-btn" onclick="event.stopPropagation(); addToCart(\${p.id})">Add to Cart</button>
                        </div>
                    </div>
                \`).join('');
            }

            function filter(cat) {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                event.target.classList.add('active');
                renderProducts(cat);
            }

            function addToCart(id) {
                const item = db.find(p => p.id === id);
                cart.push(item);
                updateUI();
                if(cart.length === 1) toggleCart();
            }

            function updateUI() {
                document.getElementById('cart-count').innerText = cart.length;
                const list = document.getElementById('cart-items');
                list.innerHTML = cart.map(i => \`<p style="display:flex; justify-content:space-between;"><span>\${i.name}</span> <span>₦\${i.price.toLocaleString()}</span></p>\`).join('');
                const total = cart.reduce((s, i) => s + i.price, 0);
                document.getElementById('cart-total').innerText = total.toLocaleString();
            }

            function toggleCart() {
                const s = document.getElementById('sidebar');
                s.style.display = s.style.display === 'block' ? 'none' : 'block';
            }

            function checkout() {
                const name = document.getElementById('order-name').value;
                const addr = document.getElementById('order-addr').value;
                const phone = document.getElementById('order-phone').value;
                const total = cart.reduce((s, i) => s + i.price, 0);

                if(!name || !addr || !phone) return alert("Fill delivery info!");

                const handler = new PaystackPop();
                handler.newTransaction({
                    key: 'pk_test_3899324fac7b348ffd8250cddc24b4',
                    email: currentEmail,
                    amount: total * 100,
                    onSuccess: (res) => {
                        const items = cart.map(c => "- " + c.name).join('%0A');
                        const msg = \`*TREND HUB ORDER*%0A\${items}%0A%0A*Total:* ₦\${total}%0A*Customer:* \${name}%0A*Address:* \${addr}%0A*Phone:* \${phone}\`;
                        window.open(\`https://wa.me/\${MY_WA}?text=\${msg}\`);
                        alert("Payment Received! Check WhatsApp for confirmation.");
                        location.reload();
                    }
                });
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => console.log("Trend Hub Mega-Store is Live!"));