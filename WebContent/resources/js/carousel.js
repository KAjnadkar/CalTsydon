$(document).ready(function(){	
	setTimeout(function(){		
		var carousel = $(".carousel");		
		function slides() {
			return carousel.find("li");
		}		
		slides().first().addClass('active');
		slides().first().fadeIn(1000);		
		moveCarousel();
		function moveCarousel(){
			var allSlides = slides();
			var activeIndex = carousel.find("li" + '.active').index();
			$(allSlides[activeIndex]).fadeOut(1000);
			$(allSlides[activeIndex]).removeClass('active');
			if (allSlides.length == (activeIndex + 1))
				activeIndex = -1;
			$(allSlides[activeIndex + 1]).fadeIn(1000);
			$(allSlides[activeIndex + 1]).addClass('active');
		}		
		setInterval(function(){
			moveCarousel();
		}, 4000);		
	}, 100);
});