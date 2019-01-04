/*
    streams the file calling the consumer for each line 
*/ 

var LineReader = require('line-by-line');
var fs = require('fs');
var reader; 
var consumer;  
var list = [];
var chunkSize = 200; 

function streamChunks(_filePath, _consumer){

    consumer = _consumer;

    reader = new LineReader(_filePath);

    reader.on('line', function(line){
        list.push(line);
        if(list.length == chunkSize) {
            pauseReading();
            consumer.collectChunk(list, callbackForNextChunk);      
        }
        //consumer.collect(line);
        //console.log(line);
        
    })

    reader.on("end", function(){
        //console.log("end of file!");
        if(list.length > 0){
            consumer.collectChunk(list, consumer.onCompletionCallback);
        } else {
            consumer.onCompletionCallback();
        }
        
    })
    
    reader.on("pause", function(){
        console.log("paused reading !");
        // if(list.length > 0){
        //     //console.log("paused: end of chunk");
        //     consumer.collectChunk(list, callbackForNextChunk);               
        // }
    })

    function callbackForNextChunk(message){
        //console.log("chuck completed");
        //console.log(message);
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

