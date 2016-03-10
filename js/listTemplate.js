var listTemplate = {
    generateTemplate: function(data){
        listTemplate.createList(data.Objects);
    },
    createList: function(data){        
        var container = $('#search-results > .container');
        history.pushState(data, 'Funda - Homepage', '#homepage');

        if (data.length < 1) {
            var errorLabel = document.createElement('label');
            var errorText = document.createTextNode('Er zijn geen resultaten gevonden.');
            errorLabel.appendChild(errorText)
            container.appendChild(errorLabel);
            return hide($('.loader'));
            ;
        } else {
            for (var i = 0; data.length > i; i++) {
                //Create all objects needed for the PLP
                var itemContainer = document.createElement('div');
                itemContainer.setAttribute('class', 'item-container');
                itemContainer.setAttribute('id', 'product-' + data[i].Id);
                itemContainer.setAttribute('tabindex', 0);

                var img = document.createElement('img');
                img.src = data[i].FotoLarge;
                img.setAttribute('alt', data[i].Adres);
                img.setAttribute('class', 'list-item-image');

                var priceLabel = document.createElement('label');
                priceLabel.setAttribute('class', 'list-item-price');
                //Convert string to euro
                var price = data[i].Prijs.Koopprijs.toLocaleString("nl-NL", {style: "currency", currency: "EUR"}).split(',');
                var priceText = document.createTextNode(price[0]);

                priceLabel.appendChild(priceText);

                itemContainer.appendChild(img);
                itemContainer.appendChild(priceLabel);
                container.appendChild(itemContainer);

                var listItem = document.getElementById('product-' + data[i].Id)

                handling.listProductClick(listItem);
            }
            return hide($('.loader'));
        }
    },
    createPaging: function(pagenumber){
        return setTimeout(function () {
            searchCall.request.getDataSearch('/amsterdam/tuin/', pagenumber, listTemplate.generateTemplate);
        }, 1000);       
    },
    createListWithFilters: function(data){        
        var priceLabel = document.getElementById('price-label');
        var priceSlider = document.getElementById('price-slider');

        var sliderVal = priceSlider.value;
        var priceTransformed = sliderVal * 10000;
        var price = priceTransformed.toLocaleString("nl-NL", {style: "currency", currency: "EUR"}).split(',');
        if (priceTransformed == 1000000) {
            priceLabel.innerHTML = price[0] + '+';
        } else {
            priceLabel.innerHTML = price[0];
        }
        
        var filteredData = [];
        for(var i = 0; i < data.Objects.length; i++){
            if(data.Objects[i].Prijs.Koopprijs < priceTransformed || priceTransformed == 1000000){
                filteredData.push(data.Objects[i]);
            }
        }
        var container = $('#search-results > .container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        return listTemplate.createList(filteredData);
    }
}