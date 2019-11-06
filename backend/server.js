var express = require('express');  
var path = require('path');      
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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

app.listen(8080);