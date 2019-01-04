/*
    streams the file chunk by chunk and invokes the callback 
*/ 

var readline = require('readline');
var fs = require('fs');
var list = [];
var chunkSize = 10; 
var reader; 
var consumer;  

function streamChunks(_filePath, _consumer){

    consumer = _consumer;

    reader = readline.createInterface({
        input : fs.createReadStream(_filePath),
        output: process.stdout,
        terminal: false
    })

    reader.on('line',function(line){
        list.push(line);
        if(list.length == chunkSize) {
            pauseReading();      
        }
    })

    reader.on("close", function(){
        console.log("closed connection to file!");
        consumer.onCompletionCallback();
    })
    
    reader.on("pause", function(){
        if(list.length > 0){
            //console.log("paused: end of chunk");
            consumer.collectChunk(list, callbackForNextChunk);               
        }
    })

    function callbackForNextChunk(message){
        //console.log("chuck completed");
        console.log(message);
        list = [];
        resumeReading();
    }
}

function pauseReading(){
    reader.pause();
}

function resumeReading(){
    reader.resume();
}

function writeFile(_filePath, _content) {
    fs.writeFile(_filePath, _content, 'utf8', function(err){
        if(err) { 
            console.log(err); return 
        }
    })
}

module.exports = { 
    streamChunks : streamChunks ,
    writeFile : writeFile
}

