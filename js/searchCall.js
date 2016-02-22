var searchCall = {
    
    apiKey: 'e2d60e885b8742d4b0648300e3703bd7',
    apiPage: 1,
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
        
        getDataSearch: function (query) {
            var apiRequest = searchCall.apiSearchUrl + '/json/' + searchCall.apiKey + '/?type=koop&zo=' + query + '&page=' + searchCall.apiPage + '&pagesize=' + searchCall.apiPageSize;
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
                    localStorage.setItem(request, result);
                    resultsTemplate.generateTemplate(JSON.parse(result));
                },
                function (error) {
                    console.log(error);
                });
            } else{
                console.log('Localstorage');
                resultsTemplate.generateTemplate(JSON.parse(storage));
            }
        },
    }
}