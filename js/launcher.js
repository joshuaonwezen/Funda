(function () {
    var launcher = {
        init: function(){
            window.onload = function () {
                preload.loadImages();
                //Load first page
                searchCall.request.getDataSearch(searchCall.apiQuery, 1, listTemplate.generateTemplate);
                
                //Load routes & handling
                handling.init();
                routing.init();
                
                //Code for map API
                $('head').appendChild(searchCall.request.getDataMap(7, 66, 42, 'koop/heel-nederland'));
            }
        },
    }
    launcher.init();
})();