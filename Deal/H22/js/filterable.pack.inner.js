/*
* Copyright (C) 2009 Joel Sutherland.
* Liscenced under the MIT liscense
*/

(function($) {
$.fn.filterable=function(settings) {
settings=$.extend( {
useHash:true, animationSpeed:1000, show: {
width:'show', opacity:'show'
}, hide: {
width:'hide', opacity:'hide'
}, useTags:true, tagSelector:'#portfolio-filter-1 a', selectedTagClass:'current', allTag:'all'
}, settings);
return $(this).each(function() {
$(this).bind("filter", function(e, tagToShow) {
if(settings.useTags) {
$(settings.tagSelector).removeClass(settings.selectedTagClass);
$(settings.tagSelector+'[href='+tagToShow+']').addClass(settings.selectedTagClass)
}
$(this).trigger("filterportfolio", [tagToShow.substr(1)])
}
);
$(this).bind("filterportfolio", function(e, classToShow) {
if(classToShow==settings.allTag) {
$(this).trigger("show")
}
else {
$(this).trigger("show", ['.'+classToShow]);
$(this).trigger("hide", [':not(.'+classToShow+')'])
}
if(settings.useHash) {
location.hash='#'+classToShow
}
}
);
$(this).bind("show", function(e, selectorToShow) {
$(this).children(selectorToShow).animate(settings.show, settings.animationSpeed)
}
);
$(this).bind("hide", function(e, selectorToHide) {
$(this).children(selectorToHide).animate(settings.hide, settings.animationSpeed)
}
);
if(settings.useHash) {
if(location.hash!='')$(this).trigger("filter", [location.hash]);
else $(this).trigger("filter", ['#'+settings.allTag])
}
if(settings.useTags) {
$(settings.tagSelector).click(function() {
$('#portfolio-list-1').trigger("filter", [$(this).attr('href')]);
$(settings.tagSelector).removeClass('current');
$(this).addClass('current')
}
)
}
}
)
}
}
)(jQuery);
$(document).ready(function() {
$('#portfolio-list-1').filterable()
}
);
