var productTemplate = {
    generateTemplate: function(id){
        productTemplate.getData(id);
    },
    getData: function(id){
        searchCall.request.getDataObject(id);
    },
    createProduct: function(result){
        console.log(result);
        //Push state so we can navigate back
        history.pushState(result, 'Funda - '+ result.Adres, '#'+result.Id);

        section.hideSections();
        
        var container = $('#product-details');
        
        var productContainer = document.createElement('div');
        productContainer.setAttribute('class', 'product-container container ' + result.Id);

        for(var i = 0; i < result['Media-Foto'].length; i++){
            var img = document.createElement('img');
            img.src = result['Media-Foto'][i];
            img.setAttribute('class', 'product-image');
            productContainer.appendChild(img);
        }
        container.appendChild(productContainer);
        
        
        
        hide($('.loader'));
    }
}