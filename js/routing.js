var routing = {
    init: function () {
//      Window onload to wait for objects to exist
        routie({
            'playlist': function () {
                routing.section.hideSections();
                document.getElementById('playlist-section').style.display = "";
            },
            'track': function () {
                routing.section.hideSections();
                document.getElementById('track-section').style.display = "";
            },
            'details': function () {
                routing.section.hideSections();
                document.getElementById('details-section').style.display = "";
            }
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
    showSection: function () {

    },
    hideSections: function () {
        //Clear all existing screens
        var screens = $('.container');
        var sections = $('section');
        var asides = $('aside');

        if(screens.length != undefined){
            for (i = 0; i < screens.length; i++) {
                hide(screens[i]);
                hide(sections[i])
                hide(asides[i]);
            }
        } else {
            hide(screens);

            for (var i; i < sections.length; i++) {
                hide(sections[i]);
            }
            for (var i; i < asides.length; i++) {
                hide(aside);
            }
        }

    },
}
