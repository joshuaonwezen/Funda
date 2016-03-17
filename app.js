
//THIS IS A POLYFILL

var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

Promise.try(function(){
	return fs.readFileAsync("./config.json").then(JSON.parse);
}).catch({code: "ENOENT"}, function(err){
	/* Return an empty object. */
	return Promise.resolve({});
}).then(function(config){
	/* `config` now either contains the JSON-parsed configuration file, or an empty object if no configuration file existed. */
});

//https://gist.github.com/joepie91/f6a56acdae303e90e44a
