var handling = {
    init: function(){
        handling.infiteScrolling();
    },
    infiteScrolling: function(){
        var pagenumber = 2;
        window.addEventListener('scroll', _.debounce(function () {
            
            var scrollHeight = $('body').scrollTop;
            var windowHeight = window.innerHeight;
            var bodyHeight = $('body').offsetHeight;

            var scrollPercent = (scrollHeight / (bodyHeight - windowHeight)) * 100;
            if (scrollPercent > 99) {
                listTemplate.createPaging(pagenumber);
                pagenumber++;
            }
        }, 500));
    },
}