var httpGet = function(theUrl)
{
   // document.getElementById('heading').innerText='Here we go!';
    //console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res=JSON.parse(xmlHttp.responseText);
            if (res.success==1){ //Good login
                console.log("Hello");
                articles=res.articles// Create
                stats=res.stats;
                generalStats=res.general_stats;
                console.log(articles);
                console.log(stats);
                console.log(generalStats);
                newsApiOutput=articles;
                displayNews(newsApiOutput);
            }
            else{ //Bad login
                console.log("Error somewhere");//document.getElementById('loginErrorMsg').innerHTML=res.msg;
            }
        }
    }  
    xmlHttp.open("GET", theUrl, true); //true for asynchronous
    xmlHttp.send();
}



var map;

function searchNews(){
   
displayNews(newsApiOutput);
console.log(newsApiOutput);
console.log(newsApiOutput.data[0]);
// console.log(newsApiOutput.articles.0.title);
//console.log(newsApiOutput.articles.0.author);

}

function displayNews(newsApiOutput){
    document.getElementById('newsList').style.display="block";
    //var articleTitle='Article Title';
    //var numberResults=newsApiOutput['totalResults'];
    var totalNum=50;
    var newsInnerHTML="";
    for (var i = 0; i < totalNum; i++) {
        var tempData=newsApiOutput.data[i];
        articleTitle=tempData.title;
        articleDate=tempData.date;
        articlePic=tempData.image_url;
        articleLink=tempData.news_url;
        articleSentiment=tempData.sentiment;
        articleSource=tempData.source_name;
        articleTickers="";
        for(var j = 0; j < tempData.tickers.length; j++){// could do something fancier with this later (e.g. link to other site)
            if (j==0){
                articleTickers += tempData.tickers[j]; 
            }
            else {
                articleTickers += " | " + tempData.tickers[j] ;
            }
        }
        
        picHTML="<img src="+articlePic+" height='100'>"
        articleHTML="<a href='"+ articleLink + "'>"+ htmlWrap(articleTitle,"h3") + "</a>";
        articleDetailsHTML=htmlWrap(articleSource+" | "+articleDate + " |  Sentiment: "+articleSentiment,"p");
        articleTickersHTML=htmlWrap(articleTickers,"p");
        tempInnerHTML = "<div id=article"+i+" style='border-style: solid; border-width: thin; border-radius: 15px; margin:1px; padding:5px'>"+picHTML+articleHTML+articleDetailsHTML+articleTickersHTML+"</div>";
        newsInnerHTML += tempInnerHTML;
            
    }          
        //var numberResults=37;
    //articleHTML=htmlWrap(articleTitle,"h3");
    //numberResultsHTML=htmlWrap(numberResults,"h4");
    document.getElementById('newsList').innerHTML=newsInnerHTML;
    
}

function htmlWrap(content,tag){
 output = "<" + tag + ">" + content + "</" + tag + ">"
    return output;

}
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
        });
    }   
function changeMap(lat,lng) {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: 8
    });
} 
function searchMap(){
    var newPlace = document.getElementById('searchBox').value;
    var searchURL = '/location/'+newPlace.toString();
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        console.log(xmlHttp.responseText);
        var newLocation = JSON.parse(xmlHttp.responseText)
        var newLatLng = newLocation.candidates[0].geometry.location;
        var newLat = newLatLng.lat;
        var newLng = newLatLng.lng;
        changeMap(newLat,newLng);
        
    }
    xmlHttp.open("GET", searchURL, false); // true for asynchronous 
    xmlHttp.send();
}

$(':input:not(textarea)').keypress(function(event) { 
    return event.keyCode != 13;
});