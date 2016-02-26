var handling = {
    init: function(){   
                
        var searchButton = $('.icon-search');
        var searchInput = document.getElementById('search-input');
        var container = $('#search-results > .container');
        handling.searchButton(searchButton, searchInput, container);
        handling.searchInput(searchButton, searchInput)
        
        var pagenumber = 2;
        handling.infiteScrolling(pagenumber);
        
        var priceSlider = document.getElementById('price-slider');
        handling.priceRangeSlider(priceSlider);

    },
    searchButton: function(searchButton, searchInput, container){
        return searchButton.addEventListener('click', function(){
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            searchCall.request.getDataSearch('/' + searchInput.value + '/', 1, listTemplate.generateTemplate);
            searchCall.apiQuery = '/' + searchInput.value + '/';
        });

    },
    searchInput: function(searchButton, searchInput){
        return searchInput.addEventListener("keypress", function (event) {
            if (event.keyCode == 13)
                searchButton.click();
        });
    },
    infiteScrolling: function(pagenumber){
        return window.addEventListener('scroll', _.debounce(function () {
            var scrollHeight = $('body').scrollTop;
            var windowHeight = window.innerHeight;
            var bodyHeight = $('body').offsetHeight;

            var scrollPercent = (scrollHeight / (bodyHeight - windowHeight)) * 100;
            if (scrollPercent > 99 && window.location.href.indexOf('product') == -1) {
                flex($('.loader'));
                listTemplate.createPaging(pagenumber);
                pagenumber++;
            }else if(scrollPercent > 99 && window.location.href.indexOf('product') != -1 && $('.product-table').length < 5){
                flex($('.loader'));
                var containerId = $('.product-container').getAttribute('class').replace('product-container container ', '');
                searchCall.request.getDataObject(containerId, productTemplate.loadImages);
            }
//            var event = new Event('change');
//            document.getElementById('price-slider').dispatchEvent(event);
        }, 500));
    },
    listProductClick: function(listItem){
        return listItem.addEventListener('click', function(){
            productTemplate.generateTemplate(this.getAttribute('id').replace('product-', ''));
        });
    },
    priceRangeSlider: function(priceSlider){        
       return priceSlider.addEventListener('change', function(){           
           searchCall.request.getDataSearch(searchCall.apiQuery, 1, listTemplate.createListWithFilters);
       });  
    },
}