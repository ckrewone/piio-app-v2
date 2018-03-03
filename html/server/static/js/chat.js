var socket = io.connect();


function CustomPrompt(){
	this.render = function(dialog,func){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "block";
		document.getElementById('dialogboxhead').innerHTML = "A value is required";
	    document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxbody').innerHTML += '<br><input id="prompt_value1">';
		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Prompt.ok(\''+func+'\')">OK</button> <button onclick="Prompt.cancel()">Cancel</button>';
	}
	this.cancel = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.ok = function(func){
		var prompt_value1 = document.getElementById('prompt_value1').value;
		window[func](prompt_value1);
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var Prompt = new CustomPrompt();

// w przypadku połączenia z serwerem, poproś o nazwę użytkownika z anonimowym oddzwonieniem
socket.on('connect', function(){
  // wywołaj funkcję "adduser" po stronie serwera i wyślij jeden parametr (wartość prompt)
  socket.emit('adduser', prompt("What's your name?"));
});

// detektor, kiedy serwer wydaje komunikat "updatechat", aktualizuje treść czatu
socket.on('updatechat', function (username, data) {
  $('#pconversation').append('<p id="conv"><b>'+username + ':</b> ' + data + '</p></ br>');
	updateScroll("pconversation");
});

// detektor, kiedy serwer wysyła "aktualizatorów", aktualizuje listę nazw użytkowników


socket.on('updateusers', function(data) {
  $('#users').empty();
  $.each(data, function(key, value) {
    $('#users').append('<div>' + key + '</div>');
  });
});



// przy ładowaniu strony
$(function(){
  // when the client clicks SEND
  $('#datasend').click( function() {
    var message = $('#data').val();
    $('#data').val('');
    // tell server to execute 'sendchat' and send along one parameter
    socket.emit('sendchat', message);
  });

  // when the client hits ENTER on their keyboard
  $('#data').keypress(function(e) {
    if(e.which == 13) {
      $(this).blur();
      $('#datasend').focus().click();
    }
  });
});


function updateScroll(myDiv){
    var element = document.getElementById(myDiv);
    element.scrollTop = element.scrollHeight;
}

$(document).ready(function(){
	$("#chatBtnPriv").click(function() {
		$(".LiveChatPriv").animate({height: '500px'}, "fast","swing", function(){
		$("#chatBtnPriv").css("visibility","hidden");
		$("#hideBtnPriv").css("visibility","visible");
		$("#visibilityMessageAreaPriv").css("visibility","visible");
	})
	});
	$("#hideBtnPriv").click(function(){
		$(".LiveChatPriv").animate({height: '500px'}, "fast","swing", function(){
		$("#hideBtnPriv").css("visibility","hidden");
		$("#chatBtnPriv").css("visibility","visible");
		$("#visibilityMessageAreaPriv").css("visibility","hidden");
	})
	});
});

$(document).ready(function(){
	$("#chatBtnPublic").click(function() {
		$(".LiveChat").animate({height: '500px'}, "fast","swing", function(){
			$("#chatBtnPublic").css("visibility","hidden");
			$("#hideBtnPublic").css("visibility","visible");
			$("#visibilityMessageArea").css("visibility","visible");
		})
		// $(".LiveChat").css("height","500px");
		// $("#chatBtnPublic").css("visibility","hidden");
		// $("#hideBtnPublic").css("visibility","visible");
		// $("#visibilityMessageArea").css("visibility","visible");
	});
	$("#hideBtnPublic").click(function(){
		$(".LiveChat").animate({height: '50px'}, "fast","swing", function(){
			$("#hideBtnPublic").css("visibility","hidden");
			$("#chatBtnPublic").css("visibility","visible");
			$("#visibilityMessageArea").css("visibility","hidden");
		})
		// $(".LiveChat").css("height","50px");
		// $("#hideBtnPublic").css("visibility","hidden");
		// $("#chatBtnPublic").css("visibility","visible");
		// $("#visibilityMessageArea").css("visibility","hidden");
	});
});

$(document).ready(function () {
				if (!$.browser.webkit) {
						$('.wrapper').html('<p>Sorry! Non webkit users. :(</p>');
				}
		});
