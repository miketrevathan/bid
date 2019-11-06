var express = require('express');  
var path = require('path');      
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//const NewsAPI = require('newsapi');
//const newsapi = new NewsAPI('8e5ca8aa98e2467485e05c7242c98de1');
app.use(express.static('../public/'));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/../public/index.html'));
    app.use(express.static(path.join(__dirname, '/../public')));
});

app.get('/location/:newPlace',function(req,res){
    var YOUR_API_KEY ='AIzaSyDa5M81r0BPakrSMeP-UTXxIsSC_dlvAIw';
    var searchURL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+req.params.newPlace+'&inputtype=textquery&fields=geometry&key='+YOUR_API_KEY;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        res.send(xmlHttp.responseText);
    };
    xmlHttp.open("GET", searchURL, false);
    xmlHttp.send();
});


app.get('/users/:username/password/:password',function(req,res){ //we'll need to update this 
    var user = req.params.username;
    var password = req.params.password;
    var x;
    var msg={"msg":"Cannot find specified username. Please try again", "success":"0"}; //Assume user cannot be found
    for (x in data){
        if (x==user){ //found user
            if (data[x].password==password){ //Good match!
                msg={"success":1,"username":x,"details":data[x].details};
            }
            else{
                msg={"msg":'Your password did not match that on file, please try again', "success":"0"}; //Case with bad password
            }
        }
    }
    res.send(msg);
});

// News API things
// To query /v2/everything
// You must include at least one q, source, or domain
/*newsapi.v2.everything({
    q: 'Chevron',
    from: '2019-10-06',
    to: '2019-11-06',
    language: 'en',
    sortBy: 'relevancy',
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */




app.listen(8080);