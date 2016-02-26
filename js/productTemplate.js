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
            if (i == 0) {
                var details = productTemplate.createProductLabels('Adres: ' + result.Adres, 'Soort woning: ' + result.SoortWoning, 'Voorzieningen: ' + result.Voorzieningen, 'Prijs: ' + result.KoopPrijs.toLocaleString("nl-NL",{style:"currency", currency:"EUR"}).replace(',00', ''));
            } else if (i == 1) {
                details = productTemplate.createProductLabels('Tuin: ' + result.Tuin, 'Ligging: ' + result.Ligging, 'Bouwvorm: ' + result.Bouwvorm, 'Bouwjaar: ' + result.Bouwjaar);
            } else if (i == 2) {
                details = productTemplate.createProductLabels('Makelaar: ' + result.Makelaar, 'Telefoonnummer: ' +  result.MakelaarTelefoon, 'Verkoopstatus: ' + result.VerkoopStatus, 'Aangeboden sinds: ' + result.AangebodenSindsTekst);
            } else if (i == 3) {
                details = productTemplate.createProductLabels('Kamers: ' + result.AantalKamers, 'Badkamers: ' + result.AantalBadkamers, 'Woonlagen: ' + result.AantalWoonlagen, 'Oppervlakte: ' + result.WoonOppervlakte + 'm2');
            }
            
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
        var bText = document.createTextNode(b);
        bLabel.appendChild(bText);

        var cLabel = document.createElement('label');
        var cText = document.createTextNode(c);
        cLabel.appendChild(cText);

        var dLabel = document.createElement('label');
        var dText = document.createTextNode(d);
        dLabel.appendChild(dText);

        container.appendChild(aLabel);
        container.appendChild(bLabel);
        container.appendChild(cLabel);
        container.appendChild(dLabel);
        
        return container;
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