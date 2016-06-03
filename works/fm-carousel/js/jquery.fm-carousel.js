(function($){

	$.fn.fm_carousel = function(options){

		var defaults = {
			quantaty: 4,
			overlayColor: '#fff',
			reverse: false,
			autoPlay: false,
			autoPlayDelay: 2000 // delay in miliseconds
		};

		var settings = $.extend(defaults, options);

		var $overlay = $('.fm-carousel-container');

		$overlay.css({
			'background-color': settings.overlayColor
			});

		var $hider = $('.fm-carousel-hider');
		var $leftArrow = $('.fm-carousel-arrow-left');
		var $rightArrow = $('.fm-carousel-arrow-right'); 
		var $carousel = $('.fm-carousel-list');
		var $leftOffset = 225;
		var $currentLeftPlace = 0;
		var $elementsCount = $carousel.find('li').length;
		var	$maximumOffset = 0;
		var	$minimumOffset = - (($elementsCount - settings.quantaty) * $leftOffset);
	
	  // Clicks and movements

	    function moveLeft(){
		if ($currentLeftPlace != $maximumOffset){
			$currentLeftPlace += 225;
			$carousel.animate({left : $currentLeftPlace + "px"}, 500);
		}	else{
		        if(settings.reverse === true){
				$currentLeftPlace = $minimumOffset;
				$carousel.animate({left : $currentLeftPlace + "px"}, 300);
			    }
			}
		}

		$leftArrow.on('click', moveLeft);

		 function moveRight(){	
		if ($currentLeftPlace != $minimumOffset){
			$currentLeftPlace -= 225;
			$carousel.animate({left : $currentLeftPlace + "px"}, 500);
		}	else{
				if(settings.reverse === true){
				$currentLeftPlace = $maximumOffset;
				$carousel.animate({left : $currentLeftPlace + "px"}, 300);
				}
		    } 
		} 

		$rightArrow.on('click', moveRight);

		// Autoplay

		var $timerId;

		function startAutoPlay(){
			if(settings.autoPlay === true){
				    $timerId = setTimeout(function tick() {
					moveRight();
					$timerId = setTimeout(tick, settings.autoPlayDelay);
				}, settings.autoPlayDelay);
			}
			
		}

		function stopAutoPlay(){
			if(settings.autoPlay === true){
			clearTimeout($timerId);
			}
		}

		$hider.on('mouseover', stopAutoPlay);  
		$leftArrow.on('mouseover', stopAutoPlay);
		$rightArrow.on('mouseover', stopAutoPlay);



		$hider.on('mouseout', startAutoPlay);  
		$leftArrow.on('mouseout', startAutoPlay);
		$rightArrow.on('mouseout', startAutoPlay);

		return this;
	};




})(jQuery);