//= partials/masonry.pkgd.min.js
//= partials/tmpl.js


/*------sliders------*/

$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slide",
    animationLoop: true,
    controlNav: false,
    slideshow: true,
    directionNav: true
  });
});


/*------ajax------*/

(function($){
// Stub array
	var imageset = [],
		stub = [
		{ url: "dist/img/gall-1.jpg", word: "Sport and Activity" },
		{ url: "dist/img/gall-2.jpg", word: "Wellnes and Health" },
		{ url: "dist/img/gall-3.jpg", word: "Extreme Sports and Expeditions"},
		{ url: "dist/img/gall-4.jpg", word: "Games"},
		{ url: "dist/img/gall-5.jpg", word: "Culture and Education"},
		{ url: "dist/img/gall-6.jpg", word: "Relaxation"},
		{ url: "dist/img/gall-7.jpg", word: "Travelling"}];


	function imgRequest() {
		var query = $('.activity-form__input').val();
		$('.activity-form__input').val("");
		sendRequest(query);
	}

	function sendRequest(query) {
		var word = encodeURIComponent(query);
		var url = 'http://api.pixplorer.co.uk/image?word=' + word + '&amount=7&size=s';

		$.ajax({
				type: "GET",
				dataType: "json",
				cache: false,
				url: url,
				success: function(data) {
					if ( data.status !== 'failed' ) {
						if (data.imageset.length > 0) {
							localStorage.setItem("word", query);
							var i = 0;
							while(i < 7) {
								imageset[i].url = data.imageset[i].imageurl;
								imageset[i].word = data.imageset[i].word;
								i++;
							}
						} else{
							if (localStorage.word) {
								$.each(imageset, function(i, img) {
									img.word = localStorage.word;
								});
							}
						}
					} else{
						imageset = repo(stub);
					}
					renderTempl(imageset);
				},
				error: function(){
					alert('Ajax doesn`t support by this browser.');
				}

		}).done(function(){
			msonry();
		});	

	}
	// Masonry
	function msonry(){

	   $('.grid').masonry({
	      itemSelector: '.grid-item', 
	       columnWidth: '.gutter-sizer', 
	       isResizable: true, 
	       singleMode: false, 
	       isAnimated: true, 
	       animationOptions: { 
	            queue: false,
	            duration: 400
	       }
	    });
	}
	// Template
	function renderTempl(imageset){
		var html = tmpl($('#_template').html(), { data:imageset });
		$('.images-dest').html(html);
	}

	function repo(dataOld) {
		var dataNew = [];
		$.each(dataOld, function(i) {
			dataNew[i] = $.extend({}, dataOld[i]);
		});
		return dataNew;
	}

	$(function() {
		imageset = repo(stub);

		if(typeof(Storage) !== "undefined") {

			var savedWord = localStorage.getItem("word");

			if (savedWord) {
				sendRequest(savedWord);
			} else {
				sendRequest('');
			}
		} else{
			var renderTmpl = function() {
					return renderTmpl(imageset);
				}

				$.when(renderTmpl()).done(function() {
					msonry();
				});
		}
	});


	        $('.block__button--activity').click(function(e) {
		        e.preventDefault();
				$('.grid').masonry('destroy');
				$('.images-dest').html("");
				imgRequest();

	    	});

	
})(jQuery);

