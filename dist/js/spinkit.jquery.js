/*!
  * Spinkit v1.2.0
  * Copyright 2016-2019
  * Author Bradley Ramdeen
  */
//must reference Jquery before this script can execute
if (typeof (jQuery) === 'undefined') {
    throw new Error('SpinKit requires jQuery');
}

(function () {
    var layout;
    var spinner;

    $.fn.spinkit = function (userOptions) {
        //setup options
        var _options = $.extend({}, $.fn.spinkit.defaults, userOptions);

        //check to see setTo property
        if (_options.useOverlay) {
            //create overlay
            _overlay = createPageOverlay();

            //set _spinkit to overlay
            layout = _overlay;
        }
        else {
            layout = this.first();
        }

        //get spinnner
        spinner = getSpinner();
        
        //set color
        if(_options.hasOwnProperty('color')){
            changeColor(_options.color);
        }
        
        //set size
        if(_options.hasOwnProperty('size')){
            changeSize(_options.size);
        }
        else if(_options.hasOwnProperty('width') || _options.hasOwnProperty('height')){
            //see if to modify height
            if(_options.hasOwnProperty('height')){
                changeHeight(_options.height);
            }

            //see if to modify width
            if(_options.hasOwnProperty('width')){
                changeWidth(_options.width);
            }
        }

        //insert into element
        layout.append(spinner);

        //gets the type of spinner needed to render
        function getSpinner() {
            return $($.fn.spinkit.templates[_options.spinner]);
        }

        function createPageOverlay(){
            var overlay = $("<div class='sk-page-overlay'></div>");
            $('body').append(overlay);

            return overlay;
        }

        function changeColor(color){
            //get target
            var target = $(spinner).data('color');
            var colorTarget = 'background';
            
            //see if a different property needs to be set
            if(typeof($(spinner).data('colorTarget')) != 'undefined'){
                colorTarget = $(spinner).data('colorTarget');
            }

            if(target == "me"){
                $(spinner).css(colorTarget, color);
            }
            else if(target == "children"){
                //each child should change background
                $(spinner).children().css(colorTarget, color);
            }
            else if(target == "pseudo") {
                //see if already set
                var styleNode = $('#spinkit-pseudo');
                
                if(styleNode.length < 1){
                    styleNode = $("<style id='spinkit-pseudo'></style>");
                    $('body').append(styleNode);
                }

                //get pseudotarget
                var pseudoTarget = $(spinner).data('pseudotarget');                
    
                //reset style
                styleNode.html(pseudoTarget + '{ ' + colorTarget + ': ' + color + '; }');
            }            
        }

        function changeSize(size){
            //change width and height
            changeHeight(size);
            changeWidth(size);
        }

        function changeHeight(height){
            $(spinner).css('height', height);
        }

        function changeWidth(width){
            $(spinner).css('width', width);
        }
    };

    $.fn.spinkit.destroy = function(){
        //look for overlay to see if it was created
        var overlay = $('.sk-page-overlay');

        if (overlay.length > 0) {
            overlay.remove();
        }
        
        //apply to all elements
        layout.each(function () {
            //find spinners and destroy them
            $(this).children('.sk').remove();
        });
    };

    $.fn.spinkit.templates = {
        "rotatingPlane": '<div class="sk sk-rotating-plane" data-color="me"></div>',
			"doubleBounce": '<div class="sk sk-double-bounce" data-color="children"><div class="sk-child sk-double-bounce1"></div><div class="sk-child sk-double-bounce2"></div></div>',
			"wave": '<div class="sk sk-wave" data-color="children"><div class="sk-rect sk-rect1"></div><div class="sk-rect sk-rect2"></div><div class="sk-rect sk-rect3"></div><div class="sk-rect sk-rect4"></div><div class="sk-rect sk-rect5"></div></div>',
			"pulse": '<div class="sk sk-spinner sk-spinner-pulse" data-color="me"></div>',
			"chasingDots": '<div class="sk sk-chasing-dots" data-color="children"><div class="sk-child sk-dot1"></div><div class="sk-child sk-dot2"></div></div>',
			"circle": '<div class="sk sk-circle" data-color="pseudo" data-pseudoTarget=".sk-circle .sk-child:before"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>',
			"cubeGrid": '<div class="sk sk-cube-grid" data-color="children"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>',
			"fadingCircle": '<div class="sk sk-fading-circle" data-color="pseudo" data-pseudoTarget=".sk-fading-circle .sk-circle:before"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
			"foldingCube": '<div class="sk sk-folding-cube" data-color="pseudo" data-pseudoTarget=".sk-folding-cube .sk-cube:before"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>',
			"beaulticircle": '<div class="sk sk-beaulticircle" data-color="children" data-color-target="border-color"><div class="sk-child sk-beaulticircle1"></div><div class="sk-child sk-beaulticircle2"></div><div class="sk-child sk-beaulticircle3"></div><div class="sk-child sk-beaulticircle4"></div><div class="sk-child sk-beaulticircle5"></div></div>'
    };

    $.fn.spinkit.defaults = { 'spinner': 'wave', 'useOverlay': false };
})(jQuery);