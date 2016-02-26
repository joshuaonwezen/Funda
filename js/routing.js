var routing = {
    init: function () {
        routie({
            'homepage': function () {
                routing.hideSections();
                show($('#homepage'));
            },
            'product': function () {
                routing.hideSections();
                show($('#product'));
            },
        });
    },

    hideSections: function () {
        //Clear all existing screens
        var screens = $('body').children;
        if(screens.length != undefined){
            for (i = 0; i < screens.length; i++) {
                hide(screens[i]);
            }
        } else {
            return hide(screens);
        }
    },
}
