
$(document).mouseup(function (e) {
  var container = $('.nav');

  if (!container.is(e.target)
      && container.has(e.target).length === 0)
  {
    $('.submenu-open').removeClass('active');
  }
});

$('body').click(function(event){
	var eventInMenu = $(event.target).parents('.nav');
	if(!eventInMenu.length){
		$('.opened').removeClass('active');
	}
})

$('.nav > li').click(function() {
	$(this).parent().find('.active').removeClass('active');
});

$('.opened').click(function() {
	$(this).addClass('active');
});

// lavalamp menu

$(function() {
	 $(".tags__menu").lavaLamp({
		fx: "backout", 
		speed: 1000,
		click: function(event, menuItem) {
			return false;
		}
	 });
});

// isotope

$(document).ready(function(){
	$('.grid').isotope({
	  itemSelector: '.grid-item',
	  layoutMode: 'fitRows',
	  transitionDuration: '0.8s'
	});
});

 $('.tags__menu span').click(function(){
   var filterValue = $(this).attr('data-filter');
   $('.grid').isotope({
     filter: filterValue
   });
});

$('.tags__menu span').click(function() {
  $('.tags__menu span').removeClass('active');
  $(this).addClass('active');
});

// animations

$('.animated').waypoint({
  handler: function(direction) {
	  $(this.element).addClass('in');
	},
	  offset: '95%',
	  triggerOnce: true
});

$(function(){
	$(".grid").addClass('animated zoomIn');
});

$('.about-in').click(function() {
	$('.about').addClass('show');
	$('body').addClass('show');
});

$('.about__content__close').click(function() {
	$('.about').removeClass('show');
	 $('body').removeClass('show');
});


// js level

$('.value').click(function() {
	$('.value').removeClass('fixed');
	$(this).addClass('fixed');
});
