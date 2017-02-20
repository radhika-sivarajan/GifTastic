var animalList = ["Duckling", "Panda", "Deer", "Hedgehog", "Elephant", "Tiger", "Beaver", "Butterfly", "Cat", "Dog", "Dove", "Seal", "Penguin", "Giraffe", "Hamster", "Kangaroo", "Lion", "Ostrich", "Pelican", "Raccoon", "Rabbit" , "Squirrel", "Swan", "Zebra", "Otter"];

function renderButton(){

	$("#animal-list").empty();

	for(var i = 0; i < animalList.length; i++){

		var btn = $("<button class='btn btn-primary'>");
		btn.addClass("animals");
		btn.attr("data-name", animalList[i]);
        btn.text(animalList[i]);
        $("#animal-list").append(btn);
	}
}


function displayAnimals(){
	var animalName = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=dc6zaTOxFJmzC&limit=12";
	
	$.ajax({
		url: queryURL,
        method: "GET"
	}).done(function (animalGIF){

		console.log(animalGIF);

		$("#animal-images").empty();

		for(var j = 0; j < animalGIF.data.length; j++){

			var animalDiv = $("<div class='pull-left'>");
			var p = $("<p>");
			var animalImg = $("<img>");

			animalImg.addClass("animal-img");
			animalImg.attr("data-state","still");
			animalImg.attr("data-still",animalGIF.data[j].images.fixed_height_still.url);
			animalImg.attr("data-animate",animalGIF.data[j].images.fixed_height.url);
		
			p.text("Rating : " + animalGIF.data[j].rating);
			animalImg.attr("src",animalGIF.data[j].images.fixed_height_still.url);

			animalDiv.append(p);
			animalDiv.append(animalImg);
			$("#animal-images").append(animalDiv);
		}
		
	});
}

function animateAnimals(){

	var state = $(this).attr("data-state");
	console.log(state);

	var animate = $(this).attr("data-animate");
	var still = $(this).attr("data-still");

	if(state !== 'still'){
		$(this).attr("src",still);
		$(this).attr("data-state",'still');

	}else{
		$(this).attr("src",animate);
		$(this).attr("data-state",'animate');
	}

}

$("#submit-animal").on("click", function(){

	event.preventDefault();

	var movie = $("#animal-name").val().trim();

	if(movie){
		animalList.push(movie);
		renderButton();
	}	
});

$(document).on("click", ".animals", displayAnimals);

$(document).on("click", ".animal-img", animateAnimals);

renderButton();