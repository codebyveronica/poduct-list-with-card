import data from "./data.json" with { type: "json" };
data.map(dessert => {
    const dessertsArea = document.querySelector('#desserts-area');
    const dessertItem = document.createElement('div');
    dessertItem.classList.add('dessert-item');
    dessertItem.dataset.id = dessert.id;
    dessertItem.innerHTML = `
    <div class="dessert-header">
                <img class="dessert-img" src="${dessert.image.mobile}" alt="">
                <button data-btn-id="addCartBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                    Add to Cart
                </button>
                <div class="counter hide" id="counter">
                <span class="decrement" id="decrement">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z" /></svg>
                </span>
                <span class="quantity" id="quantity"> 1 </span>
                <span class="increment" id="increment">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" /></svg>
                </span>
                </div>
            </div>
            <p class="dessert-category">${dessert.category}</p>
            <h2 class="dessert-name">${dessert.name}</h2>
            <strong class="dessert-price">$${dessert.price.toFixed(2)}</strong>
    `;
    dessertsArea.appendChild(dessertItem);
});

let quantDessert = 1;
const cartButtons = document.querySelectorAll('[data-btn-id="addCartBtn"]');

cartButtons.forEach(button => {
    button.addEventListener('click', e => {
        let clicked = e.target;
        let btnParent = clicked.parentNode;
        let counterBtn = btnParent.querySelector('#counter');

        let headerParent = btnParent.parentNode;
        let id = headerParent.dataset.id;
        console.log(id);
        console.log(data[id]);

        counterBtn.classList.remove('hide');
    });
});

document.querySelector('#increment').addEventListener('click', e => {
    quantDessert++;
    document.querySelector('#quantity').innerHTML = quantDessert;
})
document.querySelector('#decrement').addEventListener('click', e => {
    if(quantDessert > 1) {
        quantDessert--;
        document.querySelector('#quantity').innerHTML = quantDessert;
    }
})