var resultsTemplate = {

    generateTemplate: function(data){
        resultsTemplate.filterData(data);
    },
    filterData: function (data) {
        console.log(data);
        if (data != undefined) {
            resultsTemplate.createList(data.Objects);
        }
    },
    createList: function(data){
        var htmlResults = $('#search-results > .container');
        for (var i = 0; data.length > i; i++) {
            var itemContainer = document.createElement('div');
            itemContainer.setAttribute('class', 'item-container');
            itemContainer.setAttribute('id', data[i].Id);
            
            var img = document.createElement('img');
            img.src = data[i].FotoLarge;
            img.setAttribute('class', 'list-item-image');
            
            var priceLabel = document.createElement('label');
            priceLabel.setAttribute('class', 'list-item-price');
            var price = data[i].Prijs.Koopprijs.toLocaleString("nl-NL",{style:"currency", currency:"EUR"}).split(',');
            var priceText = document.createTextNode(price[0]);
            
            priceLabel.appendChild(priceText);
            
            itemContainer.appendChild(img);
            itemContainer.appendChild(priceLabel);
            htmlResults.appendChild(itemContainer);
        }
    },
}