 
		   
	   var myurl = "https://jsonplaceholder.typicode.com/users/"; // random jason
	   var domains = "";
	   var myIds = [];
	   var myNames = [];
	   var myTitles = [];
	   var myAddress = [];
	   var myWebsites = [];
	   var standingArray = [];
	   var latestAlarts = "";
	   var myData;
	   var sorting;
	   var totalLen = $('.bar').length;
	   var secondlastone;
	   var lastone;
	   var difference;
	   
	   		// jQuery get
	     $.get(myurl, function(data, status, sorting){	
	     	
	     	//show total posts
	     	$('.alerter').text("latest alerts ( "+data.length+" )");   					   
		     
		    myData = data;
			var random = Math.floor((Math.random() * 10) + 1);
			var increaseNumber = 100 + random ;

			// loop through callback
		    for (var i = 0; i < data.length; i++) { 
			   myIds.push(data[i].id);
			   myNames.push(data[i].name);
			   myAddress.push(data[i].address.suite);
			   myWebsites.push(data[i].website);
		       myTitles.push(data[i].company.catchPhrase);
		     
		       // random json proved to be not suitable so used some string methods to achieve results
		       var dotcom = myWebsites[i];
		       var dotcom2 = dotcom.substr(dotcom.length - 4);
		    
		        if(dotcom2 == ".net"){
		        	domains = "Low";
		        } else if(dotcom2 ==".org"){
		        	domains = "Medium";
		        } else if(dotcom2 ==".org"){
		        	domains = "Very";
		        } else {
					domains = "High";
		        }
		       // created a string of row items form the json callback
		       myString = '<div class="row"><div class="col-sm-1 col-xs-1 col-lg-1"><span class="outerspan"><span class="glyphicon glyphicon-stats" aria-hidden="true"></span></span></div>';
		       myString +='<div class="col-sm-3 col-xs-3 col-lg-3 namer">'+myNames[i]+'</div>';
		       myString += '<div class="col-sm-4 col-xs-4 col-lg-4">'+myTitles[i]+'</div>';
		       myString += '<div class="col-sm-2 col-xs-2 col-lg-2">'+myAddress[i]+'</div>';
		       myString += '<div class="col-sm-2 col-xs-2 col-lg-2 text-right"><a href="#"> '+domains+' <span class="glyphicon glyphicon-signal" aria-hidden="true"> </a></span></div></div>';
		       $('.background-green').append(myString);
			}    
										
            // http://justgage.com/  
		    var gg1 = new JustGage({
		      id: "gg1",
		      value : myIds[random],
		      min: 0,
		      max: 10,
		      decimals: 2,
		      gaugeWidthScale: 0.9,			   
		      customSectors: [{
		        color : "#759ec6",
		        lo : 0,
		        hi : 50
		      },{
		        color : "#759ec6",
		        lo : 50,
		        hi : 100
		      }],
		      counter: true
		    });
		});


		// bar graph colorings
		$('.bar').each(function(index){
			var hi = Math.random() * 100;
	 		$(this).css("height",hi + '%');
		});


		// find height of column for the Increase or Decrease functionality
		secondlastone = $('.bar:nth-last-child(3)').height();
		lastone = $('.bar').last().height();
		difference = Math.floor((lastone - secondlastone));

		if(lastone > secondlastone){
			$('.arrowsUp').append('<i class="fa fa-angle-double-up"></i>');
			$('.last-twelve1').append('INCREASE');
			$('.increase-number').append("+"+difference);
			
		}else{
			$('.arrowsUp').append('<i class="fa fa-angle-double-down" ></i>');
			$('.last-twelve1').append('DECREASE');
			$('.increase-number').append(difference);
		}

		// sort funciton
		function sortMe() {
		  myNames.sort();
		  
		  // jason data is not suitable so just improvides
		  var standingArray =[];
		  standingArray[1] = "Low";
		  standingArray[2] = "Medium";
		  standingArray[3] = "High"
		  
		  // cleared all rows
		  $('.background-green').html("");

		  	// loop the names array just for lenght or size, no other reason
			for (var i = 0; i < myNames.length; i++) { 

			  var randomNumber = Math.floor((Math.random() * 3) + 1);
			  domains = standingArray[randomNumber];
			  console.log(standingArray[0]);

			  //recreate the string for the sort functionality
			  	myString = '<div class="row"><div class="col-sm-1 col-xs-1 col-lg-1"><span class="outerspan"><span class="glyphicon glyphicon-stats" aria-hidden="true"></span></span></div>';
			       myString +='<div class="col-sm-3 col-xs-3 col-lg-3 namer">'+myNames[i]+'</div>';
			       myString += '<div class="col-sm-4 col-xs-4 col-lg-4">'+myTitles[i]+'</div>';
			       myString += '<div class="col-sm-2 col-xs-2 col-lg-2">'+myAddress[i]+'</div>';
			       myString += '<div class="col-sm-2 col-xs-2 col-lg-2 text-right"><a href="#"> '+domains+' <span class="glyphicon glyphicon-signal" aria-hidden="true"> </a></span></div></div>';
			    
			    $('.background-green').append(myString);
			}
		}	   
	

		// refresh function
		function refreshMe() {
		    location.reload();
		$('.background-green .row').hide();
		$('.background-green .row:lt(4)').show();
		}

		// creates a delay to display 4 rows only to allow for the show more functionality
		setTimeout(function(){ 
		$('.background-green .row').hide();
		$('.background-green .row:lt(4)').show();
		}, 50);


		// show more function
		function showMore() {
			$('.background-green .row').show();
			$('.seeMore').hide();
		}


		// filter function
		function filterdisplay() {
			$('.dropdown-filter ').slideToggle();
		}

		// loop all dropdown menu items
		$( '.dropdown-filter li' ).each(function(index) {
		    

		    $(this).on("click", function(){			
				var ft = $.trim($(this).text());
				
				$('.background-green .row').hide();

				// loop actual Medium, Low and High in the rows
				$('.text-right a').each(function(index){
					var filterText = $.trim($(this).text());

					// check to see if menu item text matches row text					
					if(filterText == ft){
					 $(this).parent().parent().show();	 
					}					
				})

				$('.dropdown-filter ').slideToggle();
		    });
		});
