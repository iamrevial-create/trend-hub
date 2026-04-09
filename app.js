const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. THE COMPLETE PRODUCT DATABASE
const products = [
    // FASHION & BAGS
    { id: 1, name: "Nike Air Max 270", price: 85000, cat: "Fashion", desc: "Original athletic footwear for comfort.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { id: 2, name: "Designer Leather Tote", price: 45000, cat: "Fashion", desc: "Premium genuine leather handbag.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
    { id: 3, name: "Classic Timberland", price: 95000, cat: "Fashion", desc: "Waterproof boots for all seasons.", img: "https://images.unsplash.com/photo-1520639889456-749444397334?w=400" },
    { id: 4, name: "Gucci Style Belt", price: 15000, cat: "Fashion", desc: "Luxury waist accessory.", img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400" },

    // ELECTRONICS
    { id: 5, name: "iPhone 15 Pro Max", price: 1850000, cat: "Tech", desc: "256GB Titanium finish.", img: "https://images.unsplash.com/photo-1695048133142-1a20484d256e?w=400" },
    { id: 6, name: "MacBook Pro M3", price: 2400000, cat: "Tech", desc: "Ultimate power for professionals.", img: "https://images.unsplash.com/photo-1517336714460-4c504974f231?w=400" },
    { id: 7, name: "Sony WH-1000XM5", price: 350000, cat: "Tech", desc: "World-class noise cancellation.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },

    // HOME APPLIANCES
    { id: 8, name: "Smart Air Fryer", price: 85000, cat: "Home", desc: "Oil-free healthy cooking.", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400" },
    { id: 9, name: "Robot Vacuum", price: 210000, cat: "Home", desc: "Automatic floor cleaning.", img: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=400" },
    { id: 10, name: "Electric Kettle", price: 12000, cat: "Home", desc: "Fast boiling stainless steel.", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400" },

    // VALUABLES & LUXURY
    { id: 11, name: "Gold Plated Watch", price: 150000, cat: "Luxury", desc: "Elegant gold-tone timepiece.", img: "https://images.unsplash.com/photo-1524592093055-3a3179246f41?w=400" },
    { id: 12, name: "Cuban Link Chain", price: 25000, cat: "Luxury", desc: "Silver coated jewelry.", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trend Hub | Premium Store</title>
        <script src="https://js.paystack.co/v2/inline.js"></script>
        <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 0; background: #f8f9fa; }
            header { background: #000; color: #fff; padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; }
            .auth-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 2000; }
            .auth-card { background: white; padding: 30px; border-radius: 12px; width: 90%; max-width: 380px; text-align: center; }
            .nav-tabs { display: flex; background: white; padding: 12px 5%; overflow-x: auto; border-bottom: 1px solid #ddd; }
            .tab { padding: 10px 20px; margin-right: 12px; background: #eee; border-radius: 25px; cursor: pointer; white-space: nowrap; font-weight: 500; }
            .tab.active { background: #000; color: white; }
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 25px; padding: 25px 5%; }
            .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: 0.3s; cursor: pointer; }
            .card:hover { transform: translateY(-8px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
            .card img { width: 100%; height: 220px; object-fit: cover; background: #f0f0f0; }
            .info { padding: 15px; text-align: center; }
            .price { color: #d9534f; font-weight: 700; font-size: 1.3em; margin: 10px 0; }
            #sidebar { display: none; position: fixed; right: 0; top: 0; width: 340px; height: 100%; background: white; z-index: 1500; padding: 25px; box-shadow: -10px 0 30px rgba(0,0,0,0.2); overflow-y: auto; }
            input { width: 100%; padding: 12px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
            .btn { width: 100%; padding: 14px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; text-transform: uppercase; }
            .buy-btn { background: #000; color: white; }
            .pay-btn { background: #218838; color: white; font-size: 1.1em; }
            .hidden { display: none; }
        </style>
    </head>
    <body>

        <div id="auth-gate" class="auth-overlay">
            <div class="auth-card">
                <h2 style="margin-top:0;">TREND HUB</h2>
                <p>Login or Signup to start shopping</p>
                <input type="email" id="user-email" placeholder="Email Address">
                <input type="password" placeholder="Password">
                <button class="btn buy-btn" onclick="startApp()">Enter Store</button>
            </div>
        </div>

        <header>
            <h2 style="margin:0;">TREND HUB</h2>
            <button onclick="toggleCart()" style="background:#ff4757; color:white; border:none; padding:12px 20px; border-radius:30px; cursor:pointer; font-weight:bold;">
                🛒 My Bag (<span id="cart-count">0</span>)
            </button>
        </header>

        <div class="nav-tabs">
            <div class="tab active" onclick="filter('All', event)">All Items</div>
            <div class="tab" onclick="filter('Fashion', event)">Fashion & Bags</div>
            <div class="tab" onclick="filter('Tech', event)">Electronics</div>
            <div class="tab" onclick="filter('Home', event)">Appliances</div>
            <div class="tab" onclick="filter('Luxury', event)">Valuables</div>
        </div>

        <div class="grid" id="product-grid"></div>

        <div id="sidebar">
            <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px;">Checkout <span style="float:right; cursor:pointer" onclick="toggleCart()">×</span></h2>
            <div id="cart-items" style="margin: 20px 0;"></div>
            <p style="font-size: 1.5em; border-top: 1px solid #eee; padding-top: 10px;"><strong>Total: ₦<span id="cart-total">0</span></strong></p>
            <hr>
            <h4>Delivery Details</h4>
            <input type="text" id="cust-name" placeholder="Full Name">
            <input type="text" id="cust-addr" placeholder="House Address">
            <input type="tel" id="cust-phone" placeholder="WhatsApp Number (e.g. 080...)">
            <button class="btn pay-btn" onclick="payNow()">Confirm & Pay Now</button>
        </div>

        <script>
            const allProducts = ${JSON.stringify(products)};
            let cart = [];
            let activeEmail = "";

            // SETTINGS
            const MY_PUBLIC_KEY = "pk_test_3899324fac7b348ffd8250cddc24b4"; 
            const MY_WHATSAPP = "2348000000000"; // REPLACE THIS WITH YOUR REAL NUMBER

            function startApp() {
                const mail = document.getElementById('user-email').value;
                if(!mail.includes('@')) return alert("Please enter a valid email to continue.");
                activeEmail = mail;
                document.getElementById('auth-gate').classList.add('hidden');
                render('All');
            }

            function render(category) {
                const grid = document.getElementById('product-grid');
                const items = category === 'All' ? allProducts : allProducts.filter(p => p.cat === category);
                grid.innerHTML = items.map(p => \`
                    <div class="card" onclick="alert('\${p.name}\\n\\n\${p.desc}')">
                        <img src="\${p.img}" onerror="this.src='https://placehold.co/400x400?text=Trend+Hub+Product'">
                        <div class="info">
                            <h3 style="margin:5px 0;">\${p.name}</h3>
                            <div class="price">₦\${p.price.toLocaleString()}</div>
                            <button class="btn buy-btn" onclick="event.stopPropagation(); addToCart(\${p.id})">Add to Cart</button>
                        </div>
                    </div>
                \`).join('');
            }

            function filter(cat, e) {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                render(cat);
            }

            function addToCart(id) {
                const product = allProducts.find(p => p.id === id);
                cart.push(product);
                updateUI();
                if(cart.length === 1) toggleCart();
            }

            function updateUI() {
                document.getElementById('cart-count').innerText = cart.length;
                const itemsList = document.getElementById('cart-items');
                itemsList.innerHTML = cart.map(i => \`<p style="display:flex; justify-content:space-between; margin:10px 0;"><span>\${i.name}</span> <b>₦\${i.price.toLocaleString()}</b></p>\`).join('');
                const total = cart.reduce((sum, item) => sum + item.price, 0);
                document.getElementById('cart-total').innerText = total.toLocaleString();
            }

            function toggleCart() {
                const s = document.getElementById('sidebar');
                s.style.display = (s.style.display === 'block') ? 'none' : 'block';
            }

            function payNow() {
                const name = document.getElementById('cust-name').value;
                const addr = document.getElementById('cust-addr').value;
                const phone = document.getElementById('cust-phone').value;
                const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

                if(!name || !addr || !phone) return alert("Please fill in all delivery details.");

                const handler = PaystackPop.setup({
                    key: MY_PUBLIC_KEY,
                    email: activeEmail,
                    amount: totalAmount * 100, // Paystack uses Kobo
                    currency: "NGN",
                    callback: (response) => {
                        const itemsString = cart.map(c => "- " + c.name).join('%0A');
                        const finalMsg = \`*TREND HUB NEW ORDER*%0A\${itemsString}%0A%0A*Total:* ₦\${totalAmount}%0A*Customer:* \${name}%0A*Address:* \${addr}%0A*WhatsApp:* \${phone}\`;
                        window.open(\`https://wa.me/\${MY_WHATSAPP}?text=\${finalMsg}\`);
                        alert("Thank you! Payment successful. Opening WhatsApp to confirm your order.");
                        location.reload();
                    },
                    onClose: () => { alert("Payment cancelled."); }
                });
                handler.openIframe();
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => console.log("Trend Hub All-In-One is Live on Render!"));