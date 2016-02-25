var productTemplate = {
    generateTemplate: function(id){
        searchCall.request.getDataObject(id, productTemplate.createProduct);
    },
    createProduct: function(result){
        productTemplate.createProductDetails(result);
        
        //Push state so we can navigate back
        //history.pushState(result, 'Funda - ' + result.Adres, '#product');
        window.location.hash = '#product';
        
        hide($('.loader'));
    },
    createProductDetails: function(result){
        
        console.log(result);
        var container = $('#product-details');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        var productContainer = document.createElement('div');
        productContainer.setAttribute('class', 'product-container container ' + result.Id);
        
        for (var i = 0; i < 4; i++) {
            var img = productTemplate.createProductImages(result.Media[i].MediaItems[2].Url);
            var details = productTemplate.createProductLabels(result.Titels[0].Omschrijving, result.SoortWoning, result.Voorzieningen, result.KoopPrijs, i);

            var productDetails = document.createElement('div');
            productDetails.setAttribute('class', 'product-table product-table-' + i);
            
            productDetails.appendChild(img);
            productDetails.appendChild(details);
            
            productContainer.appendChild(productDetails);
        }

        return container.appendChild(productContainer);
    },
    createProductImages: function(images){
        var img = document.createElement('img');
        img.src = images;
        img.setAttribute('class', 'product-image');
        return img;
    },
    createProductLabels: function(a, b, c, d){
        var container = document.createElement('div');
        container.setAttribute('class', 'product-details-container');
        
        var aLabel = document.createElement('label');
        var aText = document.createTextNode(a);
        aLabel.appendChild(aText);

        var bLabel = document.createElement('label');
        var bText = document.createTextNode('Soort woning: ' + b);
        bLabel.appendChild(bText);

        var cLabel = document.createElement('label');
        var cText = document.createTextNode('Voorzieningen: ' + c);
        cLabel.appendChild(cText);

        var dLabel = document.createElement('label');
        var dText = document.createTextNode('Prijs: ' + d);
        dLabel.appendChild(dText);

        container.appendChild(aLabel);
        container.appendChild(bLabel);
        container.appendChild(cLabel);
        container.appendChild(dLabel);
        
        return container;
    },
}