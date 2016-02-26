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
        
        var container = $('#product-details');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        var productContainer = document.createElement('div');
        productContainer.setAttribute('class', 'product-container container ' + result.InternalId);
        
        for (var i = 0; i < 4; i++) {
            var img = productTemplate.createProductImages(result.Media[i].MediaItems[2].Url);
            var list = document.createElement('ul');
            list.setAttribute('class', 'product-details-list');

            //Yes very ugly. best way would be an storing the data in an array and looping the function, but time & quickfix.
            if (i == 0) {
                productTemplate.createProductLabels('Adres', result.Adres, list);
                productTemplate.createProductLabels('Soort woning', result.SoortWoning, list);
                productTemplate.createProductLabels('Voorzieningen', result.Voorzieningen, list);
                productTemplate.createProductLabels('Prijs', result.KoopPrijs.toLocaleString("nl-NL",{style:"currency", currency:"EUR"}).replace(',00', ''), list);
            } else if (i == 1) {
                productTemplate.createProductLabels('Tuin', result.Tuin, list);
                productTemplate.createProductLabels('Ligging', result.Ligging, list);
                productTemplate.createProductLabels('Bouwvorm', result.Bouwvorm, list);
                productTemplate.createProductLabels('Bouwjaar', result.Bouwjaar, list);
            } else if (i == 2) {
                productTemplate.createProductLabels('Makelaar', result.Makelaar, list);
                productTemplate.createProductLabels('Telefoonnummer',  result.MakelaarTelefoon, list);
                productTemplate.createProductLabels('Verkoopstatus', result.VerkoopStatus, list);
                productTemplate.createProductLabels('Aangeboden sinds', result.AangebodenSindsTekst, list);
            } else if (i == 3) {
                productTemplate.createProductLabels('Kamers', result.AantalKamers, list);
                productTemplate.createProductLabels('Badkamers', result.AantalBadkamers, list);
                productTemplate.createProductLabels('Woonlagen', result.AantalWoonlagen, list);
                productTemplate.createProductLabels('Oppervlakte', result.WoonOppervlakte + 'm2', list);
            }
            
            var productDetails = document.createElement('div');
            productDetails.setAttribute('class', 'product-table product-table-' + i);
            
            productDetails.appendChild(img);
            productDetails.appendChild(list);
            
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
    createProductLabels: function(a, b, list){
        var listObj = document.createElement('li');
        listObj.setAttribute('class', 'product-details-list-obj');
            
        var aLabel = document.createElement('label');
        aLabel.setAttribute('class', 'product-label');
        var aText = document.createTextNode(a);
        aLabel.appendChild(aText);

        var bLabel = document.createElement('label');
        var bText = document.createTextNode(b);
        bLabel.appendChild(bText);


        listObj.appendChild(aLabel);
        listObj.appendChild(bLabel);
        
        return list.appendChild(listObj);
    },
    loadImages: function(result){
        var productContainer = $('.product-container');
        for (var i = 4; i < result.Media.length; i++) {
            if (result.Media[i].MediaItems[2] == undefined) {
                $('#product > footer').addEventListener('click', function(){
                   window.scrollTo(0, 0); 
                });
                return $('#product > footer').innerHTML = 'Terug naar details';
            }
                var img = productTemplate.createProductImages(result.Media[i].MediaItems[2].Url);
                var productDetails = document.createElement('div');

                productDetails.setAttribute('class', 'product-table product-table-' + i);
                productDetails.appendChild(img);

                productContainer.appendChild(productDetails);
        }
        return hide($('.loader'));
    }
}