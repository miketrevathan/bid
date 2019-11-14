var express = require('express');  
var path = require('path');      
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('8e5ca8aa98e2467485e05c7242c98de1');
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


app.get('/company/:companyname',function(req,res){ //we'll need to update this 

    var companyname = req.params.companyname;
    //check company name exists?
    var msg={"msg":"Cannot find specified company name. Please try again", "success":"0"}; //Assume user cannot be found
    var data;
    var x;
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
  //if name found, find file to use
    var companyFile="fb.json";
    var articles = require("./news/"+companyFile);
    var stats = require("./stats/"+companyFile);
    var generalStats = require("./stats/general.json");

    msg={"msg":"Successfully delievered news items","articles":articles,"stats":stats,"general_stats":generalStats,"success":"1"};

    res.send(msg);
});

app.get('/admin/:command/password/:password',function(req,res){ //for admin use 

    var command = req.params.command;
    var password = req.params.password;
    var msg={"msg":"Not allowed to do this function. Please try again", "success":"0"}; //Assume user cannot be found
    if (command=="update"){
        if (password=="now"){
            //code to update backend and run analysis
            var msg={"msg":"Successfully updated", "success":"1"}; //Assume user cannot be found
        }
    }
    res.send(msg);

    /*savenews(json, function(err) {
        if (err) {
          res.status(404).send('JSON not saved');
          return;
        }
    
        res.send('JSON saved');
      });
    */
    function savenews(json,name, callback) {
      fs.writeFile('./news/'+name+'.json', JSON.stringify(json), callback);
    }
    function savestats(json,name, callback) {
        fs.writeFile('./stats/'+name+'.json', JSON.stringify(json), callback);
      }
      
});






app.listen(8080);