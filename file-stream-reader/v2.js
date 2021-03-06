/*
    streams the file calling the consumer for each line 
*/ 

var LineReader = require('line-by-line');
var fs = require('fs');
var reader; 
var consumer;  
var list = [];

function streamChunks(_filePath, _consumer, _chunkSize = 200){

    consumer = _consumer;

    reader = new LineReader(_filePath);

    reader.on('line', function(line){
        list.push(line);
        if(list.length == _chunkSize) {
            pauseReading();
            consumer.collectChunk(list, callbackForNextChunk);      
        }
        
    })

    reader.on("end", function(){
        if(list.length > 0){
            consumer.collectChunk(list, consumer.onCompletionCallback);
        } else {
            consumer.onCompletionCallback();
        }
        
    })
    
    reader.on("pause", function(){
        console.log("paused reading !");
    })

    function callbackForNextChunk(message){
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

