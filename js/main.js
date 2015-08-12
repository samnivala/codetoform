// /*TODO 

// [x] Etusivun teksti
// [x] About sivun teksti
// [ ] About sivun kuvitus
// [ ] Hash routing
// [ ] Thumbeihin hoverilla useampi kuvapreview
// [x] Blog sivun linkki
// [ ] Responsiivisuus
// [x] Sivunvaihto transitiot
// [x] Ison kuvan avaus
// [ ] Typografian kokotestit / suhdeluvun kokotekstit
// [x] GA
// [ ] Shareimages
// [x] JS: Backnappien toiminta
// [x] Footer
// [ ] Kuvien valinta
// [x] Kuvien avaus transitio / toiminta
// [ ] Content sivujen avauksen muuttaminen simppeliksi funtioksi
// [ ] Casejen landingsivut

// Event listeners here, because ajax removes them when loading content
function eventListeners() {
	// Case thumbnail event listeners 
	$('.cases a').on('click', function(event) {
		event.preventDefault();

		var clickedItem = $(this).children('img').attr('src');
		var openedItem =  $(".content case:first-child");
		var isThereCaseOpened = false;
		var clickedItemPath = "cases/"+clickedItem.split('/')[1].split('.')[0]+".html";
		console.log(clickedItemPath);
		console.log("cluck");

		// test if there's case opened
		if ($('.content div:first-child').hasClass('case')) {
			console.log("yes there is case opened");
			isThereCaseOpened = true;
			$('.case:first-child').remove();
			// clear the path 
			window.history.pushState({path:'index'},'index','');
		} else {
			console.log("there is no case opened");
		}

		//open the clicked item
		$.get(clickedItemPath, function(data) {
			$('.content').prepend(data);
			//add the class to animate the opened case
			//$(".case:first-child").addClass("caseVisible");
			$(".case:first-child").hide();
			$(".case:first-child").show(1000,"easeInOutQuint");

			//add event lestener to close button
			$('.close').click(function(event){
				event.preventDefault();

				$(this).parent().hide(1000, "easeInOutQuint", function() {
					$(this).remove();
					// clear the path 
				});
				window.history.pushState({path:'index'},'index','/');
			});
		});
		window.history.pushState({path:clickedItemPath},'clickedItemPath',"/cases/"+clickedItem.split('/')[1].split('.')[0]+".html");
	});

	//Load content on popstate 
	window.addEventListener('popstate', function(event) {
  	
  		var previousPage = event.state.path;
  		console.log(previousPage);	
		$(".content").load(previousPage + ".html > .content > *");
		// Pick the correct nav item based on the previousPage
		$("nav").find('[href*="' + previousPage + '"]').addClass('selected').siblings().removeClass('selected');		
	});
};


$(document).ready(function(){

	eventListeners();

	$('.cases li').each(function(i){
		$(this).hide();
		$(this).delay(100*i).fadeIn(500, "easeInOutQuint");
	});

	// Loading content for each page on click
	$("nav a").click(function(){
		var hasSelectedClass = $(this).hasClass("selected");

		if($(this).text() == "index" && !hasSelectedClass) {			
			$(".content").load("index.html > .content > *", function(event){
				window.history.pushState({path:"index"},'Index',"./");
				$(this).removeClass("content-visible");
				$(this).addClass("content-hidden");
				setTimeout(function() {
					$(".content").removeClass("content-hidden");
					$(".content").addClass("content-visible");
				},50);
				eventListeners();

			});
		};
		if($(this).text() == "about" && !hasSelectedClass)  {
			$(this).addClass("selected");			
			$(".content").load("about.html > .content > *", function(event){
				window.history.pushState({path:"about"},'About',"about.html");
				$(this).removeClass("content-visible");
				$(this).addClass("content-hidden");
				setTimeout(function() {
					$(".content").removeClass("content-hidden");
					$(".content").addClass("content-visible");
				},50);
				
			});
		};				
	});

	//Adding selected class to navigation

	$("nav a").click(function(event) {
		if($(this).text() !== "blog") {
			event.preventDefault();
			$(this).siblings().removeClass("selected");
			$(this).addClass("selected");
		}
	});	

	//Make history item on the page user landed on initial page load
	var currentPage = window.location.pathname;

	if(currentPage === "/") {
		history.replaceState({path:"index"},'index', currentPage);
	} 

	if(currentPage === "/about.html") {
		history.replaceState({path:"about"},'about', currentPage);	
	}

	if(currentPage === "/contact.html") {
		history.replaceState({path:"contact"},'contact', currentPage);	
	}
});
