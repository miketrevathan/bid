var Sentiment = require('sentiment');

var sentiment = new Sentiment();

var mydocx = ["I like apples", "adventure", "environmental concerns"]
//var docx = sentiment.analyze("I like apples");

mydocx.forEach(function(s){
   console.log(sentiment.analyze(s));
})
