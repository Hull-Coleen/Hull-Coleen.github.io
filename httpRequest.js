const appKey = "4fdb2d8339feaef5789bedc8a5c9b43d";
		var url = "https://api.openweathermap.org/data/2.5/weather?q=";
		var url1 = "https://api.openweathermap.org/data/2.5/forecast?q="
		var xmlReponseVar;
		var JsonText;
		const appK = "44f74c43b24d79f50ebdea4869aa071d";
	
    function setLocalStoreage(searchInput) {
		console.log("local storeage function");
		if (searchInput !== undefined || searchInput !== "") {
			 localStorage.setItem("city", searchInput);
		}
	}
	function getLocalStoreage() {
		var city = localStorage.getItem("city");
		if (city !== undefined || city !== "") {
		   document.getElementById("city").placeholder = city; 
		}
	}	
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
	function exists(id) {
		var element = document.getElementById(id);
 
		//If it isn't "undefined" and it isn't "null", then it exists.
		if(typeof(element) != 'undefined' && element != null){
			return true;
		} else{
			return false;
		}
	}
	function farenheit(temp) {
		Ftemp = (temp - 273.15) * 9/5 + 32;
		return Ftemp.toFixed(0);
	}
	    function hide() {
		
			$(".item3").hide();
			$(".item4").hide();
			$(".item5").hide();
			$(".item6").hide();
			$(".item7").hide();

	}
	function show() {
			$(".item3").show();
			$(".item4").show();
			$(".item5").show();
			$(".item6").show();
			$(".item7").show();
	}
		
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
		$("#imageSun").hide();
		show();
	}
	   
	
		
	