
var express = require('express');
var request = require('request');
var router = express.Router();
var paginate = require('express-paginate');
var app = express();



var dailyCount = 0;
var weeklyCount = 0;
var olderCount = 0;
var information = [];



/*The router module will gets invoked */

router.get('/', function(req, res, next) {

	/* execute function takes URL defined in the input and invokes logic to call Github API, parses the result and set the computed array to response object*/

	function execute(url1,res){
		console.log(url1);
		var options = {
	
			url:url1,
	
	 		headers: {
    		'User-Agent': 'request',
    		'content-type': 'application/json'
  			}
		};

	var arr = [];
	var ship = [];


function callback(error,response,body){

	if(!error && response.statusCode == 200){

	var info = JSON.parse(body);
	
	var length = parseInt(info.open_issues_count);
	
	var issuesUrl = info.issues_url;
	
		issuesUrl = issuesUrl.replace('{/number}','');
		// change the request url to get different pages. Dont add it in new options
	

		//Logic to determine how to call pages numerous times
	var page_value;
	
	var per_page_value = parseInt("100");


			page_value = Math.floor((length / per_page_value)) + 1;
	
			//console.log("page value is "+page_value);
	
			if(length<=100){
				page_value = parseInt("1");
			
			}
			
			

				for (var i = 1; i <= page_value; i++) {
				
				issuesUrl = info.issues_url;
				issuesUrl = issuesUrl.replace('{/number}','');
				issuesUrl +='?'+'page='+i+'&'+'per_page='+per_page_value;

				if(i==page_value){
					issuesUrl = info.issues_url;
					issuesUrl = issuesUrl.replace('{/number}','');
					issuesUrl +='?'+'page='+i+'&'+'per_page='+length % per_page_value;
					
				}

				var newOptions = {
					url: issuesUrl,
	 				headers: {
    				'User-Agent': 'request'
  				}

				};
			
				var count = page_value;

				/*The get() appends the data collected for every API invocation into an array. When the get() calls for the final time in the for loop,
					it will call the callback function by passing the array as parameter. In this way the array can be accessed in that callback
					function wherein the logic is written to classify the array based on dates*/
					
				
				function get(error,response,value){
			
				information = JSON.parse(value);
				//console.log("Information length"+information.length);
				
				for (var i = 0; i < information.length ; i++) {
					
						arr.push({
						url: information[i].url,
						title: information[i].title,
						creation: information[i].created_at,
						body: information[i].body
						});

					
					
			}

			if(!error){
				
			}
			else{
				console.log(response.statusCode);
			}
				
					
					if(count==1){
						
						callbackToMainProgramLogic(arr);
					}
					else{
						
					}
					count = count - 1;
					
									
				
			
			
		};
			
			/*The below request module calls the API based on the number of open issues present for that Github repository through for loop*/

			  request(newOptions,get,callbackToMainProgramLogic);
			
			
	}
	
		function callbackToMainProgramLogic(arr){
			

			var presentDate = new Date();
			var currentYear = presentDate.getFullYear();
			var currentMonth = presentDate.getMonth();
			var currentDay = presentDate.getDate();
			var weeklyDate = new Date();
			var weeklyArray = [];

			dailyCount = 0;
			weeklyCount = 0;
			olderCount = 0;

			weeklyDate.setDate(weeklyDate.getDate() - 7);
			presentDate.setDate(presentDate.getDate() - 1);

			for(var i = 0 ; i < arr.length;i++){
			
			var selectedDate = new Date(arr[i].creation);

			if(selectedDate >= weeklyDate && selectedDate < presentDate){
				weeklyCount = weeklyCount + 1;
			}
			else if(selectedDate >= presentDate){
				dailyCount = dailyCount + 1;
			}
			else{
				olderCount = olderCount + 1;
			}
		}

		
		weeklyArray.push(arr.length);
		weeklyArray.push(dailyCount);
		weeklyArray.push(weeklyCount);
		weeklyArray.push(olderCount);
		
		res.render('results',{title : 'Hi', json: weeklyArray});
		

		}

	

	}


}
	
	request(options,callback);
	

}


	var url1 = req.query.myInput;

		url1 = url1.replace("github.com","api.github.com/repos");

		execute(url1,res);
		
	});



module.exports = router;


