const fileStreamReader = require("./file-stream-reader");

function fileStreamConsumer(onChunkReceiveHandler, onCompletionHandler, streamSize = 200){

    var me = this; 
    this.onChunkReceiveHandler = onChunkReceiveHandler; 
    this.onCompletionHandler = onCompletionHandler;
    this.streamSize = streamSize; 

    this.startConsuming = function(filePath){
        fileStreamReader.streamChunks(filePath, me, streamSize);
    }
    /**
     * chunk - the chunk of data streamed by the file reader 
     * callbackForNextChunk - method on the file reader to be called for fetching next chunk 
     * chunkProcessor - method to process the chunk ( provided by the )
     */
    this.collectChunk = async function(chunk, callbackForNextChunk){
        await this.onChunkReceiveHandler(chunk)
        callbackForNextChunk();
    }

    this.onCompletionCallback = function(){
        if(this.onCompletionHandler){
            this.onCompletionHandler();
        }
    }

}

module.exports = fileStreamConsumer; 

/**
 * 
 EXAMPLE of the consumer usage 

 asynchronous handler 
function handler(chunk){
    console.log("------------ received chunk ---------")

    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log(chunk)
            console.log("************ processed chunk ***********")
            resolve();
        }, 2000)
    })
}

var c = new fileStreamConsumer(handler, null, 5)

c.startConsuming("inputs/uuids.csv")

*/ 