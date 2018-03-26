var Bandwidth = require("node-bandwidth");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var http = require("http").Server(app);

//Bandwidth Credentials 
var client = new Bandwidth({
    userId    : "u-",  
    apiToken  : "t-",
    apiSecret : "u"
});

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));

/*********** Sending A Message ***********/
var numbers = {
    to: "+1##########",  //number to send to
    from: "+1##########" //Bandwidth number
};
var sendMessage = function(params){
    client.Message.send({
        //returns a promise 
        from : params.from, //your bandwidth number 
        to   : params.to,       //number to send to 
        text : "Hello",
        //the media field is not necessary unless sending a picture message
        //media: 
    })
//calls back the message id number and catches any errors 
    .then(function(message){
        return client.Message.get(message.id)
        //access ID from json can also get to and from
    })
// catches any errors     
    .catch(function(err){
        console.log(err)
    });
}

sendMessage(numbers);
