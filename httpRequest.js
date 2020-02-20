const appKey = "4fdb2d8339feaef5789bedc8a5c9b43d";
		var url = "https://api.openweathermap.org/data/2.5/weather?q=";
		var xmlReponseVar;
		var JsonText;
		
		function requestData() {
		   var searchInput = $("#city").val();
		   if (searchInput == undefined || searchInput == ""){
			   searchInput = "london";
		   }
        
		    $.get(url + searchInput + "&appid=" + appKey, {
			})
				.done(function(data) {
				console.log( data);
				console.log( data.wind.speed);
				console.log( data.main.temp);
				console.log( data.weather[0].description);
				JsonText = data;
					
			 });
		}
	    function xmlRequest() {
		   var searchInput = $("#city").val();
		   if (searchInput == undefined || searchInput == ""){
			   searchInput = "london";
		   }
		   var searchLink = url + searchInput + "&appid=" + appKey;
		   var httpRequest = new XMLHttpRequest();
			//executes on XMLHttpRequest object 
		    httpRequest.onreadystatechange = () => {
			//When readyState = 4 and  status property = 200, the (API data) response is ready
		    if (httpRequest.readyState == 4 && httpRequest.status == 200)
				    xmlReponseVar = httpRequest.responseText;
			    }
			//uses GET method, opens API URL, true for asynchronous 
			httpRequest.open("GET", searchLink, true);
			httpRequest.send();
                	
		}
		function test() {
				console.log("before parse" + xmlReponseVar);
				var parsedWeather = JSON.parse(xmlReponseVar);
				
				var t = (parsedWeather.main.temp - 273.15) * 9/5 +32;
				var m = (parsedWeather.main.temp_max - 273.15) * 9/5 +32;
				var min = (parsedWeather.main.temp_min - 273.15) * 9/5 +32;
				var feel = (parsedWeather.main.feels_like - 273.15) * 9/5 +32;
				var t2 = t.toFixed(2);
				var m2 = m.toFixed(2);
				var min2 = min.toFixed(2);
				var feel2 = feel.toFixed(2);
				$("#status").html("You are located at " + parsedWeather.coord.lon + " lon " 
				+ parsedWeather.coord.lat + "<br> your temp is " + t2 + " Feels like " +  feel2
				+ " max temp " + m2 + " min Temp " + min2 + " <br> description " 
				+ parsedWeather.weather[0].description + " wind speed " + parsedWeather.wind.speed 
				+  " country " + parsedWeather.sys.country + " city " + parsedWeather.name);
				 console.log(parsedWeather.wind.speed);
				 console.log(parsedWeather.main.temp);
				console.log(parsedWeather.weather[0].description);
		}
		function test2() {
			    var t = (JsonText.main.temp - 273.15) * 9/5 +32;
				var m = (JsonText.main.temp_max - 273.15) * 9/5 +32;
				var min = (JsonText.main.temp_min - 273.15) * 9/5 +32;
				var feel = (JsonText.main.feels_like - 273.15) * 9/5 +32;
				var t2 = t.toFixed(2);
				var m2 = m.toFixed(2);
				var min2 = min.toFixed(2);
				var feel2 = feel.toFixed(2);
			$("#status").html("XML You are located at " + JsonText.coord.lon + " lon " 
				+ JsonText.coord.lat + "<br> your temp is " + t2 + " Feels like " +  feel2
				+ " max temp " + m2 + " min Temp " + min2 + " <br> description " 
				+ JsonText.weather[0].description + " wind speed " + JsonText.wind.speed 
				+  " country " + JsonText.sys.country + " city " + JsonText.name);

		}
		
	