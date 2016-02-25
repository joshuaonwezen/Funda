var routing = {
    init: function () {
//      Window onload to wait for objects to exist
        routie({
            'homepage': function () {
                                console.log('homepage')

                routing.hideSections();
                show($('#homepage'));
            },
            'product': function () {
                console.log('product')
                routing.hideSections();
                show($('#product'));
            },
        });
    },

    toggle: function (route) {
        this.hideSections();
        //Change context depending on route
        if (window.location.href.indexOf('#') != -1) {
            var section = route.split('#');
            this.showSection(section[1]);
        }else{
            this.showSection('container');
        }
    },
    showSection: function () {

    },
    hideSections: function () {
        //Clear all existing screens
        var screens = $('body').children;


        if(screens.length != undefined){
            for (i = 0; i < screens.length; i++) {
                hide(screens[i]);
            }
        } else {
            hide(screens);
        }

    },
}
