const productsAreaHTML = document.querySelector('#products-area');
const cartAreaHTML = document.querySelector('#cart-area');
const cartQuantTxt = document.querySelector('#quantity-cart')
const addCartButtons = document.querySelectorAll('[data-btn-id=addCartBtn]');
const totalPriceTxt = document.querySelector('#total-price');

let listProducts = [];
let carts = [];

const addDataToHTML = () => {
    productsAreaHTML.innerHTML = '';
    if(listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product-item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <div class="product-header">
                <img class="product-img" src="${product.image.mobile}" alt="">
                <button class="addCart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                    Add to Cart
                </button>
                <div class="counter hide">
                <span class="decrement">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z" /></svg>
                </span>
                <span class="quantity">  </span>
                <span class="increment">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" /></svg>
                </span>
                </div>
            </div>
            <p class="product-category">${product.category}</p>
            <h2 class="product-name">${product.name}</h2>
            <strong class="product-price">$${product.price.toFixed(2)}</strong>
            `;
            productsAreaHTML.appendChild(newProduct);
        })
    }
}

productsAreaHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')) {
        let parentEl = positionClick.parentNode;
        let product_id = parentEl.parentNode.dataset.id;
        addToCart(product_id);

        let counter = parentEl.querySelector('.counter');
        counter.classList.remove('hide');
    }

    if(positionClick.classList.contains('increment')) {
        let clickParent = positionClick.parentNode;
        let parentEl = clickParent.parentNode;
        let product_id = parentEl.parentNode.dataset.id;
        addToCart(product_id);
    }

    if(positionClick.classList.contains('decrement')) {
        let clickParent = positionClick.parentNode;
        let parentEl = clickParent.parentNode;
        let product_id = parentEl.parentNode.dataset.id;
        removeFromCart(product_id);
    }
});

cartAreaHTML.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-cart')) {
        let cartItem = event.target.closest('.cart-item');
        let product_id = cartItem.dataset.id;

        removeItemFromCart(product_id);
    }
});

const removeItemFromCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    
    if (positionThisProductInCart >= 0) {
       const productElement = productsAreaHTML.querySelector(`[data-id="${product_id}"]`);
       const quantityElement = productElement.querySelector('.quantity');
       const parentElement = quantityElement.parentNode;

       carts.splice(positionThisProductInCart, 1);
       
       quantityElement.innerText = '';
       parentElement.classList.add('hide');

       addCartToHTML();
    }
}

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    const productElement = productsAreaHTML.querySelector(`[data-id="${product_id}"]`);
    const quantityElement = productElement.querySelector('.quantity');
    if(carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
        quantityElement.innerText = '1';
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
        quantityElement.innerText = '1';
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
        quantityElement.innerText = carts[positionThisProductInCart].quantity;
    }
    addCartToHTML();
    //add to memory
}

const removeFromCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    const productElement = productsAreaHTML.querySelector(`[data-id="${product_id}"]`);
    const quantityElement = productElement.querySelector('.quantity');
    const parentElement = quantityElement.parentNode;
    if (positionThisProductInCart >= 0) {
        if (carts[positionThisProductInCart].quantity > 1) {
            carts[positionThisProductInCart].quantity -= 1;
            quantityElement.innerText = carts[positionThisProductInCart].quantity;
        } else {
            carts.splice(positionThisProductInCart, 1);
            quantityElement.innerText = '';
            parentElement.classList.add('hide');
        }
    }
    
    addCartToHTML();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    cartAreaHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;
    const emptyTemplate = document.querySelector('#empty');
    const cartTotalTemplate = document.querySelector('#itens-total');

    if (carts.length <= 0) {
        emptyTemplate.classList.remove('hide');
        cartTotalTemplate.classList.add('hide');
    } else if(carts.length > 0) {
        emptyTemplate.classList.add('hide');
        cartTotalTemplate.classList.remove('hide');

        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            

            const itemTotalPrice = info.price * cart.quantity;
            totalPrice += itemTotalPrice;

            let newCart = document.createElement('div');
            newCart.classList.add('cart-item');
            newCart.dataset.id = cart.product_id;
            newCart.innerHTML = `
                <h3 class="item-name">${info.name}</h3>
                <span class="item-quantity">${cart.quantity}x</span>
                <span class="item-price">@ $${info.price.toFixed(2)}</span>
                <strong class="item-total-price">$${(info.price * cart.quantity).toFixed(2)}</strong>
                <button class="remove-cart" data-btn-id="remove-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7"d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                    </svg>
                </button>
            `;
            cartAreaHTML.appendChild(newCart);
        });
    }
    cartQuantTxt.innerHTML = `(${totalQuantity})`;

    totalPriceTxt.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
}

const initData = () => {
    //get data from json
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

        // get cart from memory
       /*  if(localStorage.getItem('cart')) {
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        } */
    });
}
initData();