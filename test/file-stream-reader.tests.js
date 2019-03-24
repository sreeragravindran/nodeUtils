var expect = require('chai').expect;
var fileStreamReader = require("../file-stream-reader");

describe("file stream reader", function(){

    it('input file of 50 lines is read in chunks of 10', function(done){
        var chunks = new Array () ; 
        var i = 0;
        var fileStreamConsumer = {
            collectChunk : function(lines, getNextChunk){
                chunks[i++] = lines; 
                getNextChunk();        
            },
            onCompletionCallback : function(){
                expect(chunks[0].length).equals(10);
                expect(chunks[1].length).equals(10); 
                expect(chunks[2].length).equals(10);
                expect(chunks[3].length).equals(10); 
                expect(chunks[4].length).equals(10); 
                done();
            }
        }
        var inputfile = __dirname + "/input.txt";    
        fileStreamReader.streamChunks(inputfile, fileStreamConsumer, 10); 

    })

    it('input file of 50 lines is read in chunks of 30 and 20', function(done){
        var chunks = new Array () ; 
        var i = 0;
        var fileStreamConsumer = {
            collectChunk : function(lines, getNextChunk){
                chunks[i++] = lines; 
                getNextChunk();        
            },
            onCompletionCallback : function(){
                expect(chunks[0].length).equals(30);
                expect(chunks[1].length).equals(20);               
                done();
            }
        }
        var inputfile = __dirname + "/input.txt";    
        fileStreamReader.streamChunks(inputfile, fileStreamConsumer, 30); 
    })

    it('the onCompletion callback is invoked only after reading all the content', function(done){
        var data = [] ;
        var fileStreamConsumer = {
            collectChunk : function(lines, getNextChunk){
                data.push(...lines);                 
                getNextChunk();        
            },
            onCompletionCallback : function(){
                expect(data.length).equals(50);                
                done();
            }
        }
        var inputfile = __dirname + "/input.txt";    
        fileStreamReader.streamChunks(inputfile, fileStreamConsumer, 10); 
    })
})