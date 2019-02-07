const express = require('express');
const app = express();
const unirest = require("unirest");

app.set('port',(process.env.PORT || 3000));

app.use(express.static('public'));


app.get("/GetImg", function (request, response) {

    var dream = request.query.dreamText;
    var userId = request.query.userId;

  //***********  TESTING NEW MC PUBLIC API    ******************
   // then post to ZApier webhook with user id and prize 
    var req = unirest("POST", "https://api.manychat.com/fb/sending/sendContent");

    req.headers({
        "Accept": "application/json",
        "Authorization": "Bearer 233331847538713:a9735489b8b30abfe8424f2a66254abd",
        "Content-Type": "application/json"
      });

    req.form({
			"subscriber_id": userId, 
				"data": {"version": "v2", 
					"content": { 
					"messages": [ 
									{ "type": "image", 
									  "url": "https://res.cloudinary.com/trafficlighthouse/image/upload/l_text:courier_25_bold_underline:"+ request.query.code +",g_north,x_-65,y_110/l_text:courier_25_bold:"+ request.query.first +"%20"+ request.query.last +",g_north,x_-65,y_80/v1542797808/voucher2.png"
                  } 
								] 
								} 

						}
			});

    req.end(function (res) {
        if (res.error) throw new Error(res.error);
      });
  
});

// listen for requests :)
app.listen(app.get('port'), function() {
  console.log('Your app is listening on port', app.get('port'));
});
