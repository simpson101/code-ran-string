const express = require('express');
const app = express();
const unirest = require("unirest");

app.set('port',(process.env.PORT || 3000));

app.use(express.static('public'));


app.get("/GetRand", function (request, response) {

    
    var userId = request.query.userId;
    var gobalRandom;
    

  //***********  TESTING Random.org API    ******************
   // 
    unirest("POST", "https://www.random.org/strings/?num=1&len=10&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new")
    

    .end(function (response) {
        gobalRandom = response.body;        
        passValue()
        response.json()
      
      });
  
  function passValue(){
    var y = gobalRandom;
    console.log(y)
    
    response.json(
      
      {
    
   "version": "v2",
    "content": {
        
        "actions": 
            {
                "action": "set_field_value",
				"field_name": "S01- Offer Code",
				"value":gobalRandom
            }      
    } 
    
  })
    
  }

   
 
  
  
});

// listen for requests :)
app.listen(app.get('port'), function() {
  console.log('Your app is listening on port', app.get('port'));
});
