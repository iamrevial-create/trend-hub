const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. FULL 12-PRODUCT DATABASE
const products = [
    { id: 1, name: "Nike Air Max 270", price: 85000, cat: "Fashion", desc: "Original athletic footwear.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
    { id: 2, name: "Designer Leather Tote", price: 45000, cat: "Fashion", desc: "Premium genuine leather.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600" },
    { id: 3, name: "Classic Timberland", price: 95000, cat: "Fashion", desc: "Waterproof luxury boots.", img: "https://images.unsplash.com/photo-1520639889456-749444397334?w=600" },
    { id: 4, name: "Gucci Style Belt", price: 15000, cat: "Fashion", desc: "Luxury waist accessory.", img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600" },
    { id: 5, name: "iPhone 15 Pro Max", price: 1850000, cat: "Tech", desc: "Titanium design.", img: "https://images.unsplash.com/photo-1695048133142-1a20484d256e?w=600" },
    { id: 6, name: "MacBook Pro M3", price: 2400000, cat: "Tech", desc: "Ultimate professional power.", img: "https://images.unsplash.com/photo-1517336714460-4c504974f231?w=600" },
    { id: 7, name: "Sony WH-1000XM5", price: 350000, cat: "Tech", desc: "World-class noise cancellation.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },
    { id: 8, name: "Smart Air Fryer", price: 85000, cat: "Home", desc: "Healthy gourmet cooking.", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600" },
    { id: 9, name: "Robot Vacuum", price: 210000, cat: "Home", desc: "Automatic floor cleaning.", img: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=600" },
    { id: 10, name: "Electric Kettle", price: 12000, cat: "Home", desc: "Fast boiling stainless steel.", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600" },
    { id: 11, name: "Gold Plated Watch", price: 150000, cat: "Luxury", desc: "Elegant gold-tone timepiece.", img: "https://images.unsplash.com/photo-1524592093055-3a3179246f41?w=600" },
    { id: 12, name: "Cuban Link Chain", price: 25000, cat: "Luxury", desc: "Premium silver-coated link.", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600" }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trend Hub | Elite E-Commerce Store</title>
        <script src="https://js.paystack.co/v2/inline.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <style>
            :root { --accent: #D4AF37; --dark: #000000; --light: #f9f9f9; --red: #ff4757; }
            body { font-family: 'Inter', sans-serif; margin: 0; background: var(--light); color: #222; scroll-behavior: smooth; }
            
            header { background: var(--dark); color: white; padding: 20px 8%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
            header h1 { font-size: 24px; letter-spacing: 4px; font-weight: 900; margin: 0; }
            
            .nav-tabs { background: white; padding: 12px 8%; display: flex; gap: 10px; overflow-x: auto; border-bottom: 1px solid #ddd; position: sticky; top: 72px; z-index: 999; }
            .tab { padding: 10px 20px; border-radius: 50px; background: #eee; cursor: pointer; font-weight: 600; font-size: 12px; white-space: nowrap; text-transform: uppercase; border: none; transition: 0.3s; }
            .tab.active { background: var(--dark); color: white; }

            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 30px; padding: 40px 8%; }
            .card { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); transition: 0.4s; cursor: pointer; }
            .card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); }
            .card img { width: 100%; height: 260px; object-fit: cover; background: #eee; }
            .info { padding: 20px; text-align: center; }
            .price { font-size: 22px; font-weight: 800; color: var(--dark); margin: 10px 0; }

            .btn { width: 100%; padding: 14px; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; text-transform: uppercase; }
            .buy-btn { background: var(--dark); color: white; }
            .bag-btn { background: var(--red); color: white; border-radius: 50px; padding: 10px 20px; font-weight: 700; border: none; cursor: pointer; }

            footer { background: #111; color: #888; padding: 60px 8% 20px; margin-top: 50px; }
            .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 40px; }
            .footer-grid h4 { color: white; margin-bottom: 20px; }
            .footer-links div { margin-bottom: 10px; cursor: pointer; transition: 0.3s; }
            .footer-links div:hover { color: white; }
            .admin-link { font-size: 11px; text-decoration: underline; cursor: pointer; border: none; background: none; color: #444; margin-top: 20px; }

            #sidebar { display: none; position: fixed; right: 0; top: 0; width: 350px; height: 100%; background: white; z-index: 2000; padding: 30px; box-shadow: -10px 0 30px rgba(0,0,0,0.1); overflow-y: auto; }
            .support-float { position: fixed; bottom: 30px; right: 30px; background: #25d366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); z-index: 999; text-decoration: none; }

            .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 3000; }
            .modal-box { background: white; padding: 40px; border-radius: 15px; text-align: center; width: 350px; max-height: 80vh; overflow-y: auto; }
            .hidden { display: none !important; }
            input { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;}
        </style>
    </head>
    <body>

        <div id="auth-gate" class="modal-overlay">
            <div class="modal-box">
                <h2>TREND HUB</h2>
                <p>Login to explore the collection</p>
                <input type="email" id="u-mail" placeholder="Email Address">
                <button class="btn buy-btn" onclick="loginUser()">Enter Store</button>
            </div>
        </div>

        <div id="admin-gate" class="modal-overlay hidden">
            <div class="modal-box">
                <h2>ADMIN PORTAL</h2>
                <input type="password" id="admin-pass" placeholder="Admin Password">
                <button class="btn buy-btn" onclick="checkAdmin()">Login</button>
                <p onclick="toggleModal('admin-gate')" style="cursor:pointer; margin-top:15px; font-size:12px;">Back to Store</p>
            </div>
        </div>

        <div id="policy-gate" class="modal-overlay hidden">
            <div class="modal-box">
                <h2 id="policy-title">Policy</h2>
                <div id="policy-content" style="text-align:left; font-size:14px; line-height:1.6; color:#555;"></div>
                <button class="btn buy-btn" style="margin-top:20px;" onclick="toggleModal('policy-gate')">Close</button>
            </div>
        </div>

        <header>
            <h1>TREND HUB</h1>
            <button onclick="toggleCart()" class="bag-btn">
                <i class="fas fa-shopping-bag"></i> BAG (<span id="count">0</span>)
            </button>
        </header>

        <div class="nav-tabs">
            <button class="tab active" onclick="filter('All', event)">All Items</button>
            <button class="tab" onclick="filter('Fashion', event)">Fashion</button>
            <button class="tab" onclick="filter('Tech', event)">Tech</button>
            <button class="tab" onclick="filter('Home', event)">Home</button>
            <button class="tab" onclick="filter('Luxury', event)">Luxury</button>
        </div>

        <div class="grid" id="main-grid"></div>

        <div id="sidebar">
            <h3 style="letter-spacing:1px;">MY BAG <span onclick="toggleCart()" style="float:right; cursor:pointer">×</span></h3>
            <hr>
            <div id="cart-items" style="margin:20px 0;"></div>
            <h4 style="display:flex; justify-content:space-between; font-size:20px;">Total: <span id="total">₦0</span></h4>
            <div style="margin-top:30px;">
                <input type="text" id="cust-name" placeholder="Receiver's Full Name">
                <input type="text" id="cust-addr" placeholder="Shipping Address">
                <input type="tel" id="cust-phone" placeholder="WhatsApp Number">
                <button class="btn buy-btn" onclick="checkout()" style="background:#28a745;">Complete Payment</button>
            </div>
        </div>

        <a href="https://wa.me/2348087364507" class="support-float" target="_blank">
            <i class="fab fa-whatsapp"></i>
        </a>

        <footer>
            <div class="footer-grid">
                <div>
                    <h4>Trend Hub Elite</h4>
                    <p>Building the future of African e-commerce. High-quality fashion, tech, and lifestyle goods.</p>
                </div>
                <div class="footer-links">
                    <h4>Customer Care</h4>
                    <div onclick="showPolicy('shipping')">Shipping Policy</div>
                    <div onclick="showPolicy('terms')">Terms of Service</div>
                    <div onclick="showPolicy('privacy')">Privacy Policy</div>
                </div>
                <div class="footer-links">
                    <h4>Support</h4>
                    <div>Direct Chat</div>
                    <div>Order Tracking</div>
                    <div>Email Us</div>
                </div>
            </div>
            <center>
                <p>&copy; 2026 Trend Hub Inc. All Rights Reserved.</p>
                <button class="admin-link" onclick="toggleModal('admin-gate')">Admin Dashboard Login</button>
            </center>
        </footer>

        <script>
            const db = ${JSON.stringify(products)};
            let cart = [];
            let currentEmail = "";
            const MY_WA = "2348087364507"; 
            const PK_KEY = "pk_test_3899324fac7b348ffd8250cddc24b4";

            function loginUser() {
                const em = document.getElementById('u-mail').value;
                if(!em.includes('@')) return alert("Please enter a valid email.");
                currentEmail = em;
                document.getElementById('auth-gate').classList.add('hidden');
                render('All');
            }

            function render(cat) {
                const grid = document.getElementById('main-grid');
                const items = cat === 'All' ? db : db.filter(p => p.cat === cat);
                grid.innerHTML = items.map(p => \`
                    <div class="card" onclick="alert('\${p.name}: \${p.desc}')">
                        <img src="\${p.img}" onerror="this.src='https://placehold.co/600x600?text=Premium+Item'">
                        <div class="info">
                            <h3 style="font-size:16px; margin:0; letter-spacing:1px;">\${p.name.toUpperCase()}</h3>
                            <div class="price">₦\${p.price.toLocaleString()}</div>
                            <button class="btn buy-btn" onclick="event.stopPropagation(); add(\${p.id})">Add to Bag</button>
                        </div>
                    </div>
                \`).join('');
            }

            function filter(cat, e) {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                render(cat);
            }

            function add(id) {
                cart.push(db.find(p => p.id === id));
                updateUI();
                if(cart.length === 1) toggleCart();
            }

            function updateUI() {
                document.getElementById('count').innerText = cart.length;
                const total = cart.reduce((s, i) => s + i.price, 0);
                document.getElementById('total').innerText = "₦" + total.toLocaleString();
                document.getElementById('cart-items').innerHTML = cart.map(i => 
                    \`<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span>\${i.name}</span> <b>₦\${i.price.toLocaleString()}</b>
                    </div>\`).join('');
            }

            function toggleCart() {
                const s = document.getElementById('sidebar');
                s.style.display = (s.style.display === 'block') ? 'none' : 'block';
            }

            function toggleModal(id) { document.getElementById(id).classList.toggle('hidden'); }

            function checkAdmin() {
                if(document.getElementById('admin-pass').value === "ADMIN") {
                    alert("Admin access granted. Redirecting to Management Console...");
                    toggleModal('admin-gate');
                } else alert("Access Denied.");
            }

            function showPolicy(type) {
                const title = document.getElementById('policy-title');
                const content = document.getElementById('policy-content');
                if(type === 'shipping') {
                    title.innerText = "Shipping Policy";
                    content.innerText = "We deliver nationwide within 3-5 business days. International shipping takes 7-14 days.";
                } else if(type === 'privacy') {
                    title.innerText = "Privacy Policy";
                    content.innerText = "Your data is encrypted and never sold. We use Paystack for secure transaction processing.";
                } else {
                    title.innerText = "Terms of Service";
                    content.innerText = "By using Trend Hub, you agree to our terms of premium service and quality guarantee.";
                }
                toggleModal('policy-gate');
            }

            function checkout() {
                const name = document.getElementById('cust-name').value;
                const addr = document.getElementById('cust-addr').value;
                const phone = document.getElementById('cust-phone').value;
                const totalAmount = cart.reduce((s, i) => s + i.price, 0);

                if(!name || !addr || !phone) return alert("Fill delivery info.");

                const handler = PaystackPop.setup({
                    key: PK_KEY,
                    email: currentEmail,
                    amount: totalAmount * 100,
                    callback: (response) => {
                        const items = cart.map(i => "• " + i.name).join('%0A');
                        const msg = \`*NEW TREND HUB ORDER*%0A\${items}%0A%0A*Total:* ₦\${totalAmount}%0A*To:* \${name}%0A*Address:* \${addr}\`;
                        window.open(\`https://wa.me/\${MY_WA}?text=\${msg}\`);
                        location.reload();
                    }
                });
                handler.openIframe();
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => console.log("Trend Hub Ultimate is Live"));