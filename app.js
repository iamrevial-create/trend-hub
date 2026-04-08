const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// 1. PRODUCT DATABASE
const products = [
    { id: 1, name: "Nike Air Max", price: 25000, desc: "Original Nike running shoes.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { id: 2, name: "Apple Watch 9", price: 450000, desc: "Series 9 with health sensors.", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400" },
    { id: 3, name: "Sony XM5", price: 320000, desc: "Top-tier noise cancellation.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { id: 4, name: "Galaxy S24", price: 1200000, desc: "Titanium build with AI.", img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400" },
    { id: 5, name: "Leather Jacket", price: 55000, desc: "Genuine black leather.", img: "https://images.unsplash.com/photo-1551028711-031c1f062497?w=400" },
    { id: 6, name: "Coffee Table", price: 75000, desc: "Minimalist oak wood.", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400" }
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
            body { font-family: sans-serif; margin: 0; background: #f4f4f4; }
            header { background: #000; color: #fff; padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
            .auth-box { background: white; padding: 20px; border-radius: 8px; max-width: 400px; margin: 20px auto; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; padding: 5%; }
            .card { background: white; padding: 15px; border-radius: 10px; text-align: center; cursor: pointer; transition: 0.3s; }
            .card:hover { transform: translateY(-5px); }
            .card img { width: 100%; height: 200px; object-fit: cover; border-radius: 5px; }
            #sidebar { display: none; position: fixed; right: 0; top: 0; width: 350px; height: 100%; background: white; box-shadow: -5px 0 15px rgba(0,0,0,0.2); z-index: 1000; padding: 20px; overflow-y: auto; }
            input { width: 100%; padding: 10px; margin: 5px 0 15px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
            .btn { width: 100%; padding: 12px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
            .add-btn { background: #000; color: white; }
            .pay-btn { background: #28a745; color: white; }
            .hidden { display: none; }
        </style>
    </head>
    <body>

        <header>
            <h2>TREND HUB</h2>
            <div id="nav-btns">
                <button onclick="showAuth()" id="auth-nav" style="background:none; border:1px solid white; color:white; padding:5px 10px; cursor:pointer;">Login / Signup</button>
                <button onclick="toggleCart()" style="background:#e44d26; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer; margin-left:10px;">🛒 Cart (<span id="count">0</span>)</button>
            </div>
        </header>

        <div id="auth-section" class="auth-box">
            <h3 id="auth-title">Create Account</h3>
            <input type="email" id="auth-email" placeholder="Email Address">
            <input type="password" id="auth-pass" placeholder="Password">
            <button class="btn add-btn" onclick="handleAuth()">Submit</button>
            <p style="font-size: 0.8em; color: blue; cursor: pointer;" onclick="toggleAuthType()" id="auth-toggle">Already have an account? Login</p>
        </div>

        <div id="store-section" class="hidden">
            <div class="grid">
                ${products.map(p => `
                    <div class="card" onclick="viewDetails('${p.name}', '${p.desc}', ${p.price})">
                        <img src="${p.img}">
                        <h3>${p.name}</h3>
                        <p style="color:#e44d26; font-weight:bold;">₦${p.price.toLocaleString()}</p>
                        <button class="btn add-btn" onclick="event.stopPropagation(); addToCart('${p.name}', ${p.price})">Add to Cart</button>
                    </div>
                `).join('')}
            </div>
        </div>

        <div id="sidebar">
            <h3>Your Cart <span style="float:right; cursor:pointer" onclick="toggleCart()">×</span></h3>
            <div id="cart-list"></div>
            <p><strong>Total: ₦<span id="total">0</span></strong></p>
            <hr>
            <h4>Shipping Info</h4>
            <input type="text" id="ship-name" placeholder="Full Name">
            <input type="text" id="ship-addr" placeholder="Delivery Address">
            <input type="tel" id="ship-phone" placeholder="WhatsApp Phone">
            <button class="btn pay-btn" onclick="startPayment()">Pay & Order via WhatsApp</button>
        </div>

        <script>
            let cart = [];
            let isLogin = false;
            const MY_PHONE = "2348087364507"; // REPLACE WITH YOUR NUMBER

            function toggleAuthType() {
                isLogin = !isLogin;
                document.getElementById('auth-title').innerText = isLogin ? "Login" : "Create Account";
                document.getElementById('auth-toggle').innerText = isLogin ? "Need an account? Signup" : "Already have an account? Login";
            }

            function handleAuth() {
                const email = document.getElementById('auth-email').value;
                if(!email) return alert("Enter email");
                document.getElementById('auth-section').classList.add('hidden');
                document.getElementById('store-section').classList.remove('hidden');
                document.getElementById('auth-nav').innerText = "Account: " + email.split('@')[0];
            }

            function viewDetails(name, desc, price) {
                alert(name + "\\n\\n" + desc + "\\n\\nPrice: ₦" + price.toLocaleString());
            }

            function addToCart(name, price) {
                cart.push({name, price});
                updateCartUI();
            }

            function updateCartUI() {
                document.getElementById('count').innerText = cart.length;
                const total = cart.reduce((sum, item) => sum + item.price, 0);
                document.getElementById('total').innerText = total.toLocaleString();
                document.getElementById('cart-list').innerHTML = cart.map(i => \`<p>\${i.name} - ₦\${i.price.toLocaleString()}</p>\`).join('');
            }

            function toggleCart() {
                const s = document.getElementById('sidebar');
                s.style.display = (s.style.display === 'block') ? 'none' : 'block';
            }

            function startPayment() {
                const name = document.getElementById('ship-name').value;
                const addr = document.getElementById('ship-addr').value;
                const phone = document.getElementById('ship-phone').value;
                const email = document.getElementById('auth-email').value;
                const total = cart.reduce((sum, item) => sum + item.price, 0);

                if(!name || !addr || !phone) return alert("Fill delivery info");

                const handler = new PaystackPop();
                handler.newTransaction({
                    key: 'pk_test_3899324fac7b348ffd8250cddc24b4',
                    email: email,
                    amount: total * 100,
                    onSuccess: (res) => {
                        const items = cart.map(c => "- " + c.name).join('%0A');
                        const msg = \`*NEW ORDER*%0A\${items}%0A%0A*Total:* ₦\${total}%0A*Customer:* \${name}%0A*Address:* \${addr}%0A*Phone:* \${phone}\`;
                        window.open(\`https://wa.me/\${MY_PHONE}?text=\${msg}\`);
                        alert("Payment Success!");
                        location.reload();
                    }
                });
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => console.log("Trend Hub is Live on Port " + PORT));