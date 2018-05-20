var tr;
$(document).ready(function(){
    $('.wrapper').height($('.wrapper').width()/1280*720+'px');
    tr = $('.wrapper').trivision();
});
$(window).resize(function(){
    $('.wrapper').height($('.wrapper').width()/1280*720+'px');
});