var routes = {
    init: function () {
//      Window onload to wait for objects to exist
        window.onload = function () {
            if (window.location.href.indexOf('#') != -1) {
                section.toggle(window.location.href)
            }

        }
        window.addEventListener('hashchange', function () {
            section.toggle(window.location.href);
        });
    },
}
//Hiding sections on single page functions
var section = {
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
    showSection: function (section) {
        var sectionDiv = $('.' + section);
        if(section == 'Homepage'){
            flex($('.container'));
        }
        else if (sectionDiv != undefined) {

            show(sectionDiv);
        }
    },
    hideSections: function () {
        //Clear all existing screens
        var screens = $('.container');

        if(screens.length != undefined){
            for (i = 0; i < screens.length; i++) {
                console.log(screens[i]);

                hide(screens[i]);
            }
        }else{
            hide(screens);
        }


    },
}
