(function () {
    var launcher = {
        init: function(){
            window.onload = function () {
                searchCall.request.getDataSearch('/amsterdam/tuin/', 1);
                searchCall.request.getDataMap(7, 66, 42, 'koop/heel-nederland');
                handling.init();
                routing.init();
            }
        },
    }
    launcher.init();
})();