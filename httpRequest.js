
var url1 = "https://api.openweathermap.org/data/2.5/forecast?q="
var JsonText;
const appK = "44f74c43b24d79f50ebdea4869aa071d";
// sets local storage if the value is not null or undefiend
function setLocalStoreage(searchInput) {
	console.log("local storeage function");
	if (searchInput !== undefined || searchInput !== "") {
		 localStorage.setItem("city", searchInput);
	}
}
// make local storage the placeholder if it is not null or undefined
function getLocalStoreage() {
	var city = localStorage.getItem("city");
	if (city !== undefined || city !== "") {
	   document.getElementById("city").placeholder = city; 
	}
}	
// gets data from openweather using api calls parseData and setLocalStore functions 
function requestData() {
	var searchInput = $("#city").val();
	if (searchInput == undefined || searchInput == ""){
		 searchInput = "london";
	}
    setLocalStoreage(searchInput);
	$.getJSON(url1 + searchInput + "&cnt=5" + "&appid=" + appK, {
	})
		.done(function(data) {
		console.log( data);
		console.log( data.list[0].main.temp);
		console.log( data.list[1].main.temp);
		console.log( data.list[2].main.temp);
		console.log( data.list[3].main.temp);
		console.log( data.list[0].weather[0].description);
		JsonText = data;
		parseData();
					
	});
	
			
}
// calls the requestData function with a touch on the text input
$(document).ready(function(){
    $("#city").on("touchstart", function() {
		console.log("inside tap function");
       requestData();
	});
});

$(document).ready(function(){
    $(".imageSun2").mouseenter(function() {
		$(".imageSun2").css("animation", "rotate 4s infinite");
		  
    });
});

$(document).ready(function(){
    $("#imageSun").mouseenter(function() {
		$("#imageSun").css("animation", "rotate 4s infinite");
		  
    });
});
$(document).ready(function(){
    $("#imageSun").mouseleave(function() {
		$("#imageSun").css("animation-play-state", "paused"); 
    });
});
$(document).ready(function(){
    $(".imageSun2").mouseleave(function() {
		$(".imageSun2").css("animation-play-state", "paused"); 
    });
});
function moving() {
   $("#imageSun").css("animation", "slidein 4s linear");
}
// checks to see if a HTML element exists and returns true if yes and false if no
function exists(id) {
	var element = document.getElementById(id);
	var e = $("#city");
	console.log("e equals" + e);
	//If it isn't "undefined" and it isn't "null", then it exists.
	if(typeof(element) != 'undefined' && element != null){
		return true;
	} else{
		return false;
	}
}
// changes a value to farenhiet and returns the rounded number
function farenheit(temp) {
	Ftemp = (temp - 273.15) * 9/5 + 32;
	return Ftemp.toFixed(0);
}
// hides the sun image in the middle
function hide() {
	$("#imageSun").css("opacity", "0");
	$("#imageSun").css("transition", "opacity 4s");		
}
// shows the forcast items
function show() {
	
	$(".item3").css("opacity", "1");
	$(".item4").css("opacity", "1");
	$(".item5").css("opacity", "1");
	$(".item6").css("opacity", "1");
	$(".item7").css("opacity", "1");
}
// shows the title, enter button, and text input
function itemShow() {

	$(".item1").css("opacity", "1");
	$(".item1").css("transition", "opacity 4s");
}
// takes the data from open weather and either changes the html values or creates them
// if they do not exist yet.
function parseData() {
	var count = 0;
	if (exists(0)) {
		console.log("true")
		for(i=0; i < 5; i++) {
				
			var li = document.getElementById(i + count );
			count++;
			var li1 = document.getElementById(i + count );
			count++;
			var li2 = document.getElementById(i + count);
			count++
			var iconcode = JsonText.list[i].weather[0].icon;
			var image = document.getElementById("image" + i);	
			image.src = "http://openweathermap.org/img/w/" + iconcode + ".png";
			li.innerHTML = "Day " + (i + 1);
			li1.innerHTML = farenheit(JsonText.list[i].main.temp);
			li2.innerHTML = JsonText.list[i].weather[0].description;
		}
	}
	else {
		for(i=0; i < 5; i++) {
					
			var a = "day" + (i + 1);
			var ul = document.getElementById(a);
			var b = i + 1;
			li = document.createElement("li");
			li.setAttribute("id", i + count);
			console.log(li.id);
			count++;
			var li1 = document.createElement("li");					
			li1.setAttribute("id", i + count);
			console.log(li1.id);
			count++;
			var li2 = document.createElement("li");
			li2.setAttribute("id", i + count);
			console.log(li2.id);
			count++;					
			var li3 = document.createElement("li");
			li3.setAttribute("id", i + count);
			console.log(li3.id);
			var image = document.createElement("img");
			image.setAttribute("id" , "image" + i);				
			console.log('image id ' + image.id);
			var iconcode = JsonText.list[i].weather[0].icon;
			image.src = "http://openweathermap.org/img/w/" + iconcode + ".png";
			li.innerHTML = "Day " + (i + 1);
			li1.innerHTML = farenheit(JsonText.list[i].main.temp);
			li2.innerHTML = JsonText.list[i].weather[0].description;
			ul.appendChild(li);
			ul.appendChild(li1);
			ul.appendChild(li2);
			ul.appendChild(li3);
			li3.appendChild(image);

		}
	}
	hide();
	show();
}
	   
	
		
	