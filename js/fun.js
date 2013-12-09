//Animation function

function moveAnimate(element, newParent){

    element = $(element); //Allow passing in either a JQuery object or selector
    newParent= $(newParent); //Allow passing in either a JQuery object or selector
    var oldOffset = element.offset();
    newParent.append(element);
    var newOffset = element.offset();

    var temp = element.clone().appendTo('body');
    temp    .css('position', 'absolute')
            .css('left', oldOffset.left)
            .css('top', oldOffset.top)
            .css('zIndex', 1000);
    element.hide();
    temp.animate( {'top': newOffset.top, 'left':newOffset.left}, 'slow', function(){
       element.show();
       temp.remove();

    element.draggable({
        		revert:  true,
        		stack: '#playerDivId div',   		
    });

});

}
