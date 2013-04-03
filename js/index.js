var marginValue = 500;
var lastVisible = 1;
var initialWidth = window.innerWidth;
var initialHeight = window.innerHeight;

if(initialWidth < 1250){
	document.getElementById("body").style.overflow = "visible";
}

// function for changing the text
function moveText(){
	marginValue -= 1;
	document.getElementById("statistics").style.marginTop = marginValue + "px";
	if(marginValue != 500 && marginValue >0 &&marginValue % 100 == 0)
	{
		lastVisible ++;
		document.getElementById("s"+lastVisible).style.display="block";
	}
	if(marginValue == -800)
	{
		resetStatistics();
	}
}

// we reset the statistics to start again
function resetStatistics(){

	lastVisible = 1;
	marginValue = 500;
	document.getElementById("statistics").style.marginTop = marginValue + "px";
	for(var i=2 ; i < 6; i++){
		var elemId = "s" + i;
		document.getElementById(elemId).style.display = "none";
	}
}

function CallFunction() {
	moveText()
	setInterval("moveText()", 50);
}


$(window).resize(function() {
	if($(this).width() < 1250){
		document.getElementById("body").style.overflow = "visible";
	}
	else{
		document.getElementById("body").style.overflow = "hidden";
	}
 
});


CallFunction();