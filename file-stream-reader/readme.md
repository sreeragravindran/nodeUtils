The file stream reader can be used to consume huge files by chunk. 

The consumer should have the following contract : 

    consumer : {
        collectChunk : function(chunk, callbackForNextChunk) {

        },
        onCompletionCallBack : function(){

        }
    }
