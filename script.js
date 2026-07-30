const products = document.getElementById("products");
const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");
const count = document.getElementById("count");
const items = document.getElementById("cartItems");
const total = document.getElementById("total");

let carrito = [];

function renderProducts(lista = PRODUCTS){

    products.innerHTML = "";

    lista.forEach((p)=>{

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${p.image}" class="foto">

            <div class="info">

                <small>${p.category}</small>

                <h3>${p.name}</h3>

                <h2>$${p.price.toLocaleString("es-CL")}</h2>

                <button>🛒 Agregar al carrito</button>

            </div>
        `;

        card.querySelector("button").onclick = ()=>agregar(p.id);

        products.appendChild(card);

    });

}

function agregar(id){

    const existe = carrito.find(p=>p.id===id);

    if(existe){

        existe.qty++;

    }else{

        const producto = PRODUCTS.find(p=>p.id===id);

        carrito.push({...producto,qty:1});

    }

    renderCart();

}

function eliminar(id){

    carrito = carrito.filter(p=>p.id!==id);

    renderCart();

}

function sumar(id){

    carrito.find(p=>p.id===id).qty++;

    renderCart();

}

function restar(id){

    const producto = carrito.find(p=>p.id===id);

    producto.qty--;

    if(producto.qty<=0){

        eliminar(id);

        return;

    }

    renderCart();

}

function renderCart(){

    count.textContent = carrito.reduce((a,b)=>a+b.qty,0);

    items.innerHTML = "";

    let suma = 0;

    carrito.forEach(p=>{

        suma += p.price * p.qty;

        const div = document.createElement("div");

        div.className = "item-cart";

        div.innerHTML = `

            <h4>${p.name}</h4>

            <p>$${p.price.toLocaleString("es-CL")}</p>

            <p>Cantidad: ${p.qty}</p>

            <button onclick="restar(${p.id})">➖</button>

            <button onclick="sumar(${p.id})">➕</button>

            <button onclick="eliminar(${p.id})">🗑 Eliminar</button>

        `;

        items.appendChild(div);

    });

    total.textContent = suma.toLocaleString("es-CL");

}

cartBtn.onclick = ()=>{

    cart.classList.remove("hidden");

}

closeCart.onclick = ()=>{

    cart.classList.add("hidden");

}

document.getElementById("search").addEventListener("input",(e)=>{

    const texto = e.target.value.toLowerCase();

    const filtrados = PRODUCTS.filter(p=>

        p.name.toLowerCase().includes(texto) ||

        p.category.toLowerCase().includes(texto)

    );

    renderProducts(filtrados);

});

document.getElementById("verProductos").onclick=()=>{

    document.getElementById("products").scrollIntoView({

        behavior:"smooth"

    });

}

document.getElementById("checkout").onclick=()=>{

    if(carrito.length===0){

        alert("El carrito está vacío.");

        return;

    }

    let mensaje = "🛒 *Nuevo pedido JR TECH*%0A%0A";

    carrito.forEach(p=>{

        mensaje += `• ${p.name}%20x${p.qty}%20-%20$${(p.price*p.qty).toLocaleString("es-CL")}%0A`;

    });

    mensaje += `%0A💰 Total: $${carrito.reduce((a,b)=>a+b.price*b.qty,0).toLocaleString("es-CL")}`;

    window.open(`https://wa.me/56949935461?text=${mensaje}`,"_blank");

}

renderProducts();