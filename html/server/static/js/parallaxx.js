
$("h2").find("a").click(function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top
    });
});

$("div").find("a").click(function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top
    });
});

$("header").find("a").click(function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top
    },200);
});

$('.parallax-window').parallax();


window.sr = ScrollReveal();
sr.reveal('.row', {
	duration:500,
	origin: 'bottom',
	reset: true
});

sr.reveal('.navbar a', {
	duration:500,
	origin: 'left'
});

sr.reveal('h1', {
	duration:1000,
	origin: 'top',
	delay:500,
	distance: '10px',
	scale: 0.7,
	reset: true
});

sr.reveal('h2', {
	duration:1000,
	origin: 'top',
	delay:700,
	distance: '10px',
	scale: 0.7,
	reset: true,
	opacity: 0
});

sr.reveal('h3', {
	duration:1000,
	origin: 'top',
	delay:100,
	distance: '10px',
	scale: 0.7,
	reset: true,
	opacity: 0
});

sr.reveal('.rounded-circle', { duration: 1000,
	opacity:0,
reset: true }, 50);

sr.reveal('.scrolled-logo', { duration: 1000,
	opacity:0,
reset: true }, 50);


$(document).ready(function(){
  var scrollTop = 0;
  $(window).scroll(function(){
    scrollTop = $(window).scrollTop();
     $('.counter').html(scrollTop);

    if (scrollTop >= 10) {
      $('#global-nv').addClass('scroll-nav');
			$("#Logopng").addClass('scrolled-logo');
			$('#Namepng').addClass('scrolled-name');
			$(".nav-link").addClass('scrolled-link');


    } else if (scrollTop < 10) {
      $('#global-nv').removeClass('scroll-nav');
			$('#Logopng').removeClass('scrolled-logo');
			$('#Namepng').removeClass('scrolled-name');
			$(".nav-link").removeClass('scrolled-link');
    }

  });

});


function loginView(){
	$('#main').css({ display: 'none' });
	$('#login').css({ display: 'block' });
	$('#register').css({ display: 'none' });
	$('.parallax-window').addClass('parallax-window-login');
}

function indexView(){
	$('#main').css({ display: 'block' });
	$('#login').css({ display: 'none' });
	$('#register').css({ display: 'none' });
	$('.parallax-window').removeClass('parallax-window-login');
}

function registerView(){
	$('#main').css({ display: 'none' });
	$('#register').css({ display: 'block' });
	$('#login').css({ display: 'none' });
	$('.parallax-window').addClass('parallax-window-login');
}
