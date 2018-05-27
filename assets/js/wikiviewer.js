$("input[type='search']").on("keypress", function(event){

	if(event.which === 13){

		var query = $(this).val();

		if(query !== ""){

			var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch='  + query;
			
			// clean an input area
			$(this).val("");

	    $.getJSON(wikiURL)
	        .done(updateSearchResults)
	        .fail(errorSearch);
	    }
	}
});

function updateSearchResults(data) {

	var articles = data.query.search;


	// if a list of articles already exists, delete it
	if($("#articles")){
		$("#articles").remove();
	};

	// create a new ul list
	$("#container").append("<ul id='articles'></ul>");

	if(articles.length === 0){
		$("ul").append("<li>Nothing was found. Please try new search!</li>").hide().fadeIn(1000);
	} else {

		// loop through articles and add them to lis
		articles.forEach(article => {
			var title = article.title;
			var snippet = article.snippet;
			var link = "https://en.wikipedia.org/?curid=" + article.pageid;

			$("ul").append("<a href='" + link + "' target='#'>" + "<li>" + title + "<p>" + snippet + "</p>" +"</li>" + "</a>").hide().fadeIn(1000);
		});
	};
};

function errorSearch() {
	alert("Unable to retrieve data from Wikipedia");
};