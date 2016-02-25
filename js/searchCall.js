var searchCall = {
    
    apiKey: 'e2d60e885b8742d4b0648300e3703bd7',
    apiPageSize: 25,
    apiSearchUrl: 'http://funda.kyrandia.nl/feeds/Aanbod.svc',
    apiMapUrl: 'http://mt1.funda.nl',
    apiQuery: '/amsterdam/tuin/',
    
    request: {

        getDataMap: function(z,x,y, query){
            var apiRequest = searchCall.apiMapUrl + '/maptiledata.ashx?z='+z+'&x='+x+'&y='+y+'&zo='+query+'&callback=searchCall.request.parseMapResponse';
            var script = document.createElement('script')
            script.src = apiRequest;
            return script;
        },
        
        parseMapResponse: function(data){
            console.log(data);
        },
        
        getDataSearch: function (query, page, action) {
            var apiRequest = searchCall.apiSearchUrl + '/json/' + searchCall.apiKey + '/?type=koop&zo=' + query + '&page=' + page + '&pagesize=' + searchCall.apiPageSize;
            return searchCall.request.createRequest(apiRequest, action);
        },
        
        getDataObject: function(id, action){
            var apiRequest = searchCall.apiSearchUrl + '/json/detail/' + searchCall.apiKey + '/koop/' + id;
            return searchCall.request.createRequest(apiRequest, action);
        },
        
        createRequest: function(request, action){
            var storage = localStorage.getItem(request);
            var data = {
                method: "GET",
                url: request,
            }
            if (storage == undefined) {
                ajaxRequest.promiseAjaxReq(data).then(function (result) {
                    flex($('.loader'));
                    localStorage.setItem(request, result);
                    return action(JSON.parse(result));
                },
                function (error) {
                    hide($('.loader'));
                    console.log(error);
                });
            } else{
                console.log('Localstorage');
                flex($('.loader'));
                return action(JSON.parse(storage));
            }
        },
    }
}