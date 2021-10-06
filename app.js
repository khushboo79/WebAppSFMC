'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');
const SFClient = require('./utils/sfmc-client');
var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json({type: 'application/json'})); 
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );


app.post('/message',function(req,res){
  console.log('Hello');
  console.log('This is '+req);
  console.log("Reply Body:"+req.body);
  
  const circularReplacer = () => {
  
    // Creating new WeakSet to keep 
    // track of previously seen objects
    const seen = new WeakSet();
      
    return (key, value) => {
  
        // If type of value is an 
        // object or value is null
        if (typeof(value) === "object" 
                   && value !== null) {
          
        // If it has been seen before
        if (seen.has(value)) {
                 return;
             }
               
             // Add current value to the set
             seen.add(value);
       }
         
       // return the value
       return value;
   };
};
  
var jsonString = JSON.stringify(req, circularReplacer());
console.log(jsonString);
  var jsonBody = JSON.stringify(req.body, circularReplacer());
console.log('This is body '+jsonBody);
   var jsonRes = JSON.stringify(res, circularReplacer());
console.log('Response '+jsonRes);
  
  
   try
     {
         SFClient.saveData(process.env.DATA_EXTENSION_KEY, [
                        {
                        keys: {
                          Id: req.body.SmsSid
                        },
                        values: {
                           
                         Body:req.body.Body,
                          Phone:req.body.From
                        },
                      }
                    ]);
               }
                catch(err)   
               {
                   console.log(err);
               }
               
  
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
