(function () {
    var launcher = {
        init: function(){
            window.onload = function () {
                var dataSearch = searchCall.request.getDataSearch(searchCall.apiQuery, 1, listTemplate.generateTemplate);
                $('head').appendChild(searchCall.request.getDataMap(7, 66, 42, 'koop/heel-nederland'));
                handling.init();
                routing.init();
            }
        },
    }
    launcher.init();
})();