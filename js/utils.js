var $ = function (id) {
        var elements = document.querySelectorAll(id);
        if(elements.length > 1){
            return elements;
        }
        if(elements.length == 1){
            return elements[0];
        }
};

var show = function(item) {
    if(item != undefined){
        item.classList.add('show');
        item.classList.remove('hide');
    }
}
var flex = function(item){
    if (item != undefined) {
        item.classList.add('flex');
        item.classList.remove('hide');
    }
}
var hide = function(item) {
    if (item != undefined) {
        console.log(item);
        item.classList.add('hide');
        item.classList.remove('show');
        item.classList.remove('flex');
    }
}
