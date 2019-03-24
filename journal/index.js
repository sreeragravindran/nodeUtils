function Journal(){

    var logs = []; 

    var Info = function(source, info){   
        this.type = "info";      
        this.source = source; 
        this.data = info;
        this.timeStamp = new Date();
    }

    var Error = function(source, error){
        this.type = "error";
        this.source = source;
        this.error = error;
        this.timeStamp = new Date();
    }

    // source can be file / mdoule / method / event name 
    // info can be a string / object 
    this.logInfo = function(source, info){
        logs.push(new Info(source, info));
    } 

    this.logError = function(source, error){
        logs.push(new Error(source, error));
    } 
    
    this.getLogs = function(){
        // ideally this should be immutable 
        return logs; 
    }

    this.clear = function(){
        logs.length = 0; 
    }

    this.containsInfo = function(info){
        if(typeof info == "string"){
            return logs.filter(log => {
                return (log.type == "info" && typeof log.data == "string")  
            })
            .some(log => {
                if(log.data.includes(info)){
                    return true; 
                }
            });            
        }
        return false;
    }

    this.containsError = function(error){
        if(typeof error == "string"){
            return logs.filter(log => {
                return (log.type == "error" && typeof log.error == "string")  
            })
            .some(log => {
                if(log.error.includes(error)){
                    return true; 
                }
            });            
        }
        return false;
    }
}

module.exports = new Journal();