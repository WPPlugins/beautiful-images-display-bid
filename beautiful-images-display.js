/******************  Beautiful Images Display [By iWillFolo.com] **********************/ 
var Bimgs = document.getElementsByTagName("img");
var n = [];
// check which imgs contain the relevant string 
for (var i=0; i<Bimgs.length; i++) { 
	if ( (Bimgs[i].hasAttribute("class")) && (Bimgs[i].getAttribute("class").indexOf( "wp-image-" ) > -1) ) {
		Bimgs[i].parentNode.setAttribute("onclick", "return false;");
		Bimgs[i].setAttribute("onclick", "BeautifulFunction(" + i + " )");
			n[i] = i;
	}
}

// check if img parent element (a href) leads to the original image, if so use as link, otherwise use element src.
function hrefOrsc( i ) {
	if ( (Bimgs[i].parentNode.getAttribute("href") !== null) && (Bimgs[i].parentNode.getAttribute("href").indexOf(".jpg"|".jpeg"|".gif"|".png") > -1) ) {
		return Bimgs[i].parentNode.getAttribute("href");
	} else {
		return Bimgs[i].getAttribute("src");
	}
}

var overlay = '';
var beautiful = '';
var beautifulImg = null;
var closeBtn = null;
var backbtn = '';
var forwardbtn = '';
// Whether to display back / forward buttons or not.
function displayNavArrows(i) {
	if ( (i-1) !== n[i-1] ) {
		backbtn.style.display = 'none';
	}
	if ( (i+1) !== n[i+1] ) {
		forwardbtn.style.display = 'none';
	}
}
// Remove elements when no longer needed.
function rmElements() {
	document.body.removeChild(beautiful);
	document.body.removeChild(overlay);
}

// Asses correct width
var iwfWidth = 0;
var iwfHeight = 0;
function scalefun() {
  if (window.innerWidth > window.outerWidth) {
    iwfWidth = window.outerWidth;
    iwfHeight = window.outerHeight;
  } else {
    iwfWidth = window.innerWidth;
    iwfHeight = window.innerHeight;
  }
}
scalefun();

function BeautifulFunction( i ) { 
	overlay = document.createElement("DIV");
	overlay.setAttribute("id", "beautiful-overlay");
	document.body.appendChild(overlay);
	beautiful = document.createElement("DIV");
	beautiful.setAttribute("id", "beautiful-img-cont");
	beautiful.innerHTML = "<img id='beautiful-img' tabindex='0' src='" + hrefOrsc( i ) + "' onclick='beautifulImgClick(" + i + ")' /><div id='closebtn'>X</div><div id='backbtn' onclick='swypeBack(" + i + ")'>" + '<' + "</div><div id='forwardbtn' onclick='swypeForward(" + i + ")'>" + '>' + "</div>";
	document.body.appendChild(beautiful);
	beautifulImg = document.getElementById( "beautiful-img" );
	closeBtn = document.getElementById( "closebtn" );
	backbtn = document.getElementById('backbtn');
	forwardbtn = document.getElementById('forwardbtn');
	displayNavArrows(i);
	beautifulImg.style.maxWidth = (iwfWidth - 40) + "px";
	beautifulImg.style.maxHeight = iwfHeight - (iwfHeight * 0.09) + "px";
	beautifulImg.style.top = window.pageYOffset +  (iwfHeight * 0.05) + "px";
	var imgInterval = setInterval(function() {
		if (beautifulImg.complete == true) {
			closeBtn.style.top = beautifulImg.offsetTop - 15 + "px";
			closeBtn.style.right = Math.max(0 ,(iwfWidth - beautifulImg.offsetWidth) / 2 - 15 ) + "px";
			forwardbtn.style.right = ( (iwfWidth - beautifulImg.offsetWidth) / 2 + 20 ) + "px";
			backbtn.style.left = ( (iwfWidth - beautifulImg.offsetWidth) / 2 + 20 ) + "px";
			backbtn.style.top = forwardbtn.style.top = beautifulImg.offsetTop + beautifulImg.offsetHeight / 2 + "px";
			clearInterval(imgInterval);
		}
	}, 50);
	
	beautifulImg.focus();
	overlay.onclick = function() {
		rmElements();
	}
	closeBtn.onclick = function() {
		rmElements();
	}
	beautifulImg.onkeydown = function(event) {
		if (event.keyCode == 27) {
			rmElements();
		} else if (event.keyCode == 37) {
			swypeBack(i);
		} else if (event.keyCode == 39) {
			swypeForward(i);
		} else if (event.keyCode == 13) {
			beautifulImgClick(i);
		}
	}
 }

// Decide whether it's possible to swype back / forward or not.
function swypeBack(i) {
	if ( (i-1) == n[i-1] ) {
		rmElements();
		BeautifulFunction( i-1 );
	}
}
function swypeForward(i) {
	if ( (i+1) == n[i+1] ) {
		rmElements();
		BeautifulFunction( i+1 );
	}
}
// Toggle arrows visibility upon img click;
function beautifulImgClick(i) {
	if ( (backbtn.style.display !== 'block') && ((i-1) == n[i-1]) ) {
		backbtn.style.display = 'block';
	} else {
		backbtn.style.display = 'none';
	}
	if ( (forwardbtn.style.display !== 'block') && ((i+1) == n[i+1]) ) {
		forwardbtn.style.display = 'block';
	} else {
		forwardbtn.style.display = 'none';
	}
}
// Make imgs responsive
function responsiveBeautifulImg() {
	if (beautifulImg !== null) {
		beautifulImg.style.maxWidth = (iwfWidth - 40) + "px";
		beautifulImg.style.maxHeight = iwfHeight - 90 + "px";
		closeBtn.style.top = beautifulImg.offsetTop - 15 + "px";
		closeBtn.style.right = Math.max(0 ,(iwfWidth - beautifulImg.offsetWidth) / 2 - 15 ) + "px";
		forwardbtn.style.right = ( (iwfWidth - beautifulImg.offsetWidth) / 2 + 20 ) + "px";
		backbtn.style.left = ( (iwfWidth - beautifulImg.offsetWidth) / 2 + 20 ) + "px";
		backbtn.style.top = forwardbtn.style.top = beautifulImg.offsetTop + beautifulImg.offsetHeight / 2 + "px";
	}
}
window.onresize = function() {
	scalefun();
	responsiveBeautifulImg();
}
/************************** / Beautiful Images Display ****************************/
