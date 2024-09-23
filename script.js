fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        data.map((item, index) => {3
            let dessertsItem = document.querySelector('.models .dessert-item').cloneNode(true);
            
            document.querySelector('#desserts-area').append(dessertsItem);

            dessertsItem.querySelector('.dessert-img').src = item.image.mobile;
            dessertsItem.querySelector('.dessert-category').innerHTML = item.category;
            dessertsItem.querySelector('.dessert-name').innerHTML = item.name;
            dessertsItem.querySelector('.dessert-price').innerHTML = `$${item.price.toFixed(2)}`;
        })
    })