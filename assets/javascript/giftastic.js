// Animal name array
var animalList = ["Duckling", "Panda", "Deer", "Hedgehog", "Elephant", "Tiger", "Beaver", "Peacock", "Cat", "Dog", "Dove", "Seal", "Penguin", "Giraffe", "Hamster", "Kangaroo", "Lion", "Ostrich", "Pelican", "Raccoon", "Rabbit" , "Squirrel", "Swan", "Zebra", "Otter", "Parrot", "Bear"];

// Render animal button list on screen
function renderButton(){

	// Empty the section before rendering
	$("#animal-list").empty();

	//Loop through each array element, create button for each of them, set values and attributes accordingly
	for(var i = 0; i < animalList.length; i++){

		var btn = $("<button class='btn btn-primary'>");

		btn.addClass("animals-btn");
		btn.attr("data-name", animalList[i]);
        btn.text(animalList[i]);

        $("#animal-list").append(btn);
	}
}

//Display animals using giphy API
function displayAnimals(){

	//Get the name of animal from the button clicked and add to the URL
	var animalName = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=dc6zaTOxFJmzC&limit=12";
	
	// Ajax call
	$.ajax({
		url: queryURL,
        method: "GET"
	}).done(function (animalGIF){

		console.log(animalGIF);

		// Empty section before displaying animal images
		$("#animal-images").empty();

		for(var j = 0; j < animalGIF.data.length; j++){

			// Create html elements for each object
			var animalDiv = $("<div class='pull-left'>");
			var p = $("<p>");
			var animalImg = $("<img>");

			// Set attributes (still image url, animated image url, status of image to still and class) to the image
			animalImg.addClass("animal-img");
			animalImg.attr("data-state","still");
			animalImg.attr("data-still",animalGIF.data[j].images.fixed_height_still.url);
			animalImg.attr("data-animate",animalGIF.data[j].images.fixed_height.url);
			
			// Get the image url and its ratiing
			p.text("Rating : " + animalGIF.data[j].rating);
			animalImg.attr("src",animalGIF.data[j].images.fixed_height_still.url);

			// Append image and its rating
			animalDiv.append(animalImg);
			animalDiv.append(p);
			$("#animal-images").append(animalDiv);
		}
		
	});
}

// When we click on the image it should animate if we click again it should stop
function animateAnimals(){

	// Get the attributes of clicked image
	var state = $(this).attr("data-state");
	var animate = $(this).attr("data-animate");
	var still = $(this).attr("data-still");

	//Change url according to the status
	if(state !== 'still'){
		$(this).attr("src",still);
		$(this).attr("data-state",'still');

	}else{
		$(this).attr("src",animate);
		$(this).attr("data-state",'animate');
	}

}

// On submtitig new animal name add to the animal list
$("#submit-animal").on("click", function(){

	event.preventDefault();

	//Get user input
	var movie = $("#animal-name").val().trim();

	// If user input a alue append to the animal list array and render the butons
	if(movie){
		animalList.push(movie);
		renderButton();
	}	
});

// When clicking on any of the button in the animal list, call displayAnimals to display animals
$(document).on("click", ".animals-btn", displayAnimals);

// When click on any of image displayed, call animateAnimals function to animate
$(document).on("click", ".animal-img", animateAnimals);

renderButton();