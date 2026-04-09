const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. FULL DATABASE - 12 PREMIUM PRODUCTS
const products = [
    // FASHION & BAGS
    { id: 1, name: "Nike Air Max 270", price: 85000, cat: "Fashion", desc: "Original athletic footwear.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
    { id: 2, name: "Designer Leather Tote", price: 45000, cat: "Fashion", desc: "Premium genuine leather.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600" },
    { id: 3, name: "Classic Timberland", price: 95000, cat: "Fashion", desc: "Waterproof luxury boots.", img: "https://images.unsplash.com/photo-1520639889456-749444397334?w=600" },
    { id: 4, name: "Gucci Style Belt", price: 15000, cat: "Fashion", desc: "Luxury waist accessory.", img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600" },

    // ELECTRONICS
    { id: 5, name: "iPhone 15 Pro Max", price: 1850000, cat: "Tech", desc: "Titanium design.", img: "https://images.unsplash.com/photo-1695048133142-1a20484d256e?w=600" },
    { id: 6, name: "MacBook Pro M3", price: 2400000, cat: "Tech", desc: "Ultimate professional power.", img: "https://images.unsplash.com/photo-1517336714460-4c504974f231?w=600" },
    { id: 7, name: "Sony WH-1000XM5", price: 350000, cat: "Tech", desc: "World-class noise cancellation.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },

    // HOME APPLIANCES
    { id: 8, name: "Smart Air Fryer", price: 85000, cat: "Home", desc: "Healthy gourmet cooking.", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600" },
    { id: 9, name: "Robot Vacuum", price: 210000, cat: "Home", desc: "Automatic floor cleaning.", img: "https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=600" },
    { id: 10, name: "Electric Kettle", price: 12000, cat: "Home", desc: "Fast boiling stainless steel.", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600" },

    // VALUABLES & LUXURY
    { id: 11, name: "Gold Plated Watch", price: 150000, cat: "Luxury", desc: "Elegant gold-tone timepiece.", img: "https://images.unsplash.com/photo-1524592093055-3a3179246f41?w=600" },
    { id: 12, name: "Cuban Link Chain", price: 25000, cat: "Luxury", desc: "Premium silver-coated link.", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600" }
];

app.get('/', (req, res) => {
    res.send(\`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trend Hub | Elite Collection</title>
        <script src="https://js.paystack.co/v2/inline.js"></script>
        <style>
            :root { --accent: #D4AF37; --dark: #000000; --light: #f4f4f4; }
            body { font-family: 'Inter', sans-serif; margin: 0; background: var(--light); color: #222; }
            header { background: var(--dark); color: white; padding: 25px 8%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; box-shadow: 0 5px 20px rgba(0,0,0,0.4); }
            header h1 { font-size: 28px; letter-spacing: 5px; font-weight: 900; margin: 0; }
            .nav-tabs { background: white; padding: 15px 8%; display: flex; gap: 15px; overflow-x: auto; border-bottom: 1px solid #ddd; position: sticky; top: 83px; z-index: 999; }
            .tab { padding: 10px 25px; border-radius: 50px; background: #eee; cursor: pointer; font-weight: 600; font-size: 13px; white-space: nowrap; transition: 0.3s; text-transform: uppercase; border: 1px solid transparent; }
            .tab.active { background: var(--dark); color: white; transform: scale(1.05); }
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 35px; padding: 40px 8%; }
            .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: 1px solid #efefef; }
            .card:hover { transform: translateY(-15px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
            .card img { width: 100%; height: 300px; object-fit: cover; background: #eee; transition: 0.5s; }
            .info { padding: 25px; text-align: center; }
            .price { font-size: 24px; color: var(--dark); font-weight: 800; margin: 15px 0; border-top: 1px solid #eee; padding-top: 10px; }
            .price span { color: var(--accent); }
            .btn { width: 100%; padding: 16px; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
            .buy-btn { background: var(--dark); color: white; }
            #sidebar { display: none; position: fixed; right: 0; top: 0; width: 400px; height: 100%; background: white; z-index: 2000; padding: 45px; box-shadow: -20px 0 50px rgba(0,0,0,0.2); overflow-y: auto; }
            input { width: 100%; padding: 15px; margin-bottom: 15px; border: 2px solid #f0f0f0; border-radius: 8px; font-size: 16px; box-sizing: border-box; }
            .pay-btn { background: #1a1a1a; color: white; border: 1px solid gold; }
            .auth-gate { position: fixed; inset: 0; background: var(--dark); display: flex; justify-content: center; align-items: center; z-index: 3000; }
            .auth-box { background: white; padding: 50px; border-radius: 20px; text-align: center; width: 400px; }
            .hidden { display: none !important; }
        </style>
    </head>
    <body>
        <div id="auth-gate" class="auth-gate">
            <div class="auth-box">
                <h1 style="letter-spacing:6px; margin-bottom:10px;">TREND HUB</h1>
                <p style="color: #888; margin-bottom: 30px; text-transform: uppercase; font-size: 12px;">The Elite Shopping Experience</p>
                <input type="email" id="u-mail" placeholder="Email Address">
                <button class="btn buy-btn" onclick="startApp()">Enter Store</button>
            </div>
        </div>
        <header>
            <h1>TREND HUB</h1>
            <button onclick="toggleCart()" style="background:var(--accent); color:black; border:none; padding:12px 25px; border-radius:50px; cursor:pointer; font-weight:900; letter-spacing:1px;">
                BAG (<span id="count">0</span>)
            </button>
        </header>
        <div class="nav-tabs">
            <div class="tab active" onclick="filter('All', event)">Everything</div>
            <div class="tab" onclick="filter('Fashion', event)">Fashion</div>
            <div class="tab" onclick="filter('Tech', event)">Tech</div>
            <div class="tab" onclick="filter('Home', event)">Home</div>
            <div class="tab" onclick="filter('Luxury', event)">Luxury</div>
        </div>
        <div class="grid" id="product-grid"></div>
        <div id="sidebar">
            <h2 style="margin-top:0; border-bottom: 3px solid #000; padding-bottom: 15px; letter-spacing:2px;">MY BAG <span style="float:right; cursor:pointer" onclick="toggleCart()">×</span></h2>
            <div id="cart-items" style="margin: 30px 0;"></div>
            <h3 style="display:flex; justify-content:space-between; font-size: 24px;">Total: <span id="total" style="color:var(--accent);">₦0</span></h3>
            <div style="margin-top:40px;">
                <input type="text" id="cust-name" placeholder="Full Name">
                <input type="text" id="cust-addr" placeholder="Shipping Address">
                <input type="tel" id="cust-phone" placeholder="WhatsApp Number">
                <button class="btn pay-btn" onclick="checkout()">Checkout Now</button>
            </div>
        </div>
        <script>
            const db = \${JSON.stringify(products)};
            let cart = [];
            let currentEmail = "";
            const MY_WA = "2348000000000"; // Replace with your number
            const PK_KEY = "pk_test_3899324fac7b348ffd8250cddc24b4"; 

            function startApp() {
                const em = document.getElementById('u-mail').value;
                if(!em.includes('@')) return alert("Please enter a valid email.");
                currentEmail = em;
                document.getElementById('auth-gate').classList.add('hidden');
                render('All');
            }

            function render(cat) {
                const grid = document.getElementById('product-grid');
                const items = cat === 'All' ? db : db.filter(p => p.cat === cat);
                grid.innerHTML = items.map(p => \`
                    <div class="card" onclick="alert('\${p.name}: \${p.desc}')">
                        <img src="\${p.img}" onerror="this.src='https://placehold.co/600x600?text=Trend+Hub+Elite'">
                        <div class="info">
                            <h3 style="letter-spacing:1px;">\${p.name.toUpperCase()}</h3>
                            <div class="price"><span>₦</span>\${p.price.toLocaleString()}</div>
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
                    \`<div style="display:flex; justify-content:space-between; margin-bottom:15px; font-weight:600;">
                        <span>\${i.name}</span><b>₦\${i.price.toLocaleString()}</b>
                    </div>\`).join('');
            }

            function toggleCart() {
                const s = document.getElementById('sidebar');
                s.style.display = (s.style.display === 'block') ? 'none' : 'block';
            }

            function checkout() {
                const name = document.getElementById('cust-name').value;
                const addr = document.getElementById('cust-addr').value;
                const phone = document.getElementById('cust-phone').value;
                const totalAmount = cart.reduce((s, i) => s + i.price, 0);
                if(!name || !addr || !phone) return alert("Please complete shipping info.");

                const handler = PaystackPop.setup({
                    key: PK_KEY,
                    email: kikelomoajayi768@gmail.com,
                    amount: totalAmount * 100,
                    callback: (response) => {
                        const items = cart.map(i => "• " + i.name).join('%0A');
                        const msg = \`*TREND HUB ORDER*%0A\${items}%0A%0A*Total:* ₦\${totalAmount}%0A*To:* \${name}%0A*Address:* \${addr}\`;
                        window.open(\`https://wa.me/\${MY_WA}?text=\${msg}\`);
                        alert("Payment Success!");
                        location.reload();
                    }
                });
                handler.openIframe();
            }
        </script>
    </body>
    </html>
    \`);
});

app.listen(PORT, () => console.log("Trend Hub Elite Live"));