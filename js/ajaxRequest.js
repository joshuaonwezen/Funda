var ajaxRequest = {
//Information Source: http://www.tutorialspoint.com/ajax/what_is_xmlhttprequest.htm
    promiseAjaxReq: function(data){
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            
            req.open(data.method, data.url);
            req.onload = function () {

                if (req.status == 200) {
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            }
            req.onerror = function(){
                reject(Error("Network error"));
            };
            req.send();
           
        });
    }
};