var searchCall = {
    
    apiKey: 'e2d60e885b8742d4b0648300e3703bd7',
    apiPageSize: 25,
    apiSearchUrl: 'http://funda.kyrandia.nl/feeds/Aanbod.svc',
    apiMapUrl: 'http://mt1.funda.nl',
    
    request: {

        getDataMap: function(z,x,y, query){
            var apiRequest = searchCall.apiMapUrl + '/maptiledata.ashx?z='+z+'&x='+x+'&y='+y+'&zo='+query+'&callback=searchCall.request.parseMapResponse';
            var script = document.createElement('script')
            script.src = apiRequest;
            $('head').appendChild(script);
        },
        
        parseMapResponse: function(data){
            console.log(data);
        },
        
        getDataSearch: function (query, page) {
            console.log(page);
            var apiRequest = searchCall.apiSearchUrl + '/json/' + searchCall.apiKey + '/?type=koop&zo=' + query + '&page=' + page + '&pagesize=' + searchCall.apiPageSize;
            this.createRequest(apiRequest);
        },
        
        getDataObject: function(id){
            var apiRequest = searchCall.apiSearchUrl + '/json/detail/' + searchCall.apiKey + '/koop/' + id;
            this.createRequest(apiRequest);
        },
        
        createRequest: function(request){
            var storage = localStorage.getItem(request);
            var data = {
                method: "GET",
                url: request,
            }
            if (storage == undefined) {
                ajaxRequest.promiseAjaxReq(data).then(function (result) {
                    flex($('.loader'));
                    localStorage.setItem(request, result);
                    listTemplate.generateTemplate(JSON.parse(result));
                },
                function (error) {
                    hide($('.loader'));
                    console.log(error);
                });
            } else{
                console.log('Localstorage');
                flex($('.loader'));
                listTemplate.generateTemplate(JSON.parse(storage));
            }
        },
    }
}