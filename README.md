# IssueCollection
IssueCollection is a repository which would display the list of all open issues opened for any public Github repository which were opened in the last 24 hours, last 7 days and beyond 7 days


This application has been made with Node JS with Express web framework. The module used for accessing Github api is as follows:

   request module
    
    This module creates simple https calls across the web. I used this module to hit the github API URL in order to access a particular      field called "open_issues_count" for the first time. After I got the total number of open issues count, subsequent requests to github     api was to retrieve issues JSON objects which contain a field called "created_at"(which contains the date on which that particular       issue was opened in string format). These subsequent API requests retrieved 100 of these JSON objects if "open_issues_count" > 100       for a particular repository. The reason to retrieve 100 JSON objects at a time was to reduce calling github API as less as possible      and github allowed a maximum of 100 objects to be returned at each iteration. 
    
    After getting all the json objects, the results were collated in an array and was passed to the callback function.
    
    This callback function had the logic to segregate these objects based on when they were opened (24 hours back , 7 days back or beyond     7 days back)
    
 
This application is hosted on heroku on the following URL:

https://nameless-ocean-77801.herokuapp.com/

When you launch the application, paste any github repository in the text box and click on Submit.

Few examples for public repositories are:
  https://github.com/airbnb/caravel
  https://github.com/firehol/netdata
