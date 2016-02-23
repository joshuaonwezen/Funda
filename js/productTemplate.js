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
        hide($('.loader'));
    }
}