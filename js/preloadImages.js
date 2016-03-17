preload = {
    loadImages: function(){
        var container = $('#search-results > .container');

        for (var i = 0; 25 > i; i++) {
            //Create all objects needed for the PLP
            var itemContainer = document.createElement('div');
            itemContainer.setAttribute('class', 'item-container');
            itemContainer.setAttribute('id', 'product-' + i);
            itemContainer.setAttribute('tabindex', 0);


            var img = document.createElement('img');
            img.src = 'resources/thumbnail.jpg';
            img.setAttribute('alt', 'Laden..' + i);
            img.setAttribute('class', 'list-item-image');

            var priceLabel = document.createElement('label');
            priceLabel.setAttribute('class', 'list-item-price');
            //Convert string to euro
            var price = 'Laden..';
            var priceText = document.createTextNode(price);

            priceLabel.appendChild(priceText);

            itemContainer.appendChild(img);
            itemContainer.appendChild(priceLabel);
            container.appendChild(itemContainer);
            itemContainer.addEventListener('keyup', function (e) {
                if (e.which == 13 || e.which == 32) {
                    itemContainer.click();
                }
            });


            var listItem = document.getElementById('product-' + i)

            handling.listProductClick(listItem);
        }
        return hide($('.loader'));  
    },
    imageChange: function(img){
        img.setAttribute('src', img.getAttribute('srcset'));
    },
}