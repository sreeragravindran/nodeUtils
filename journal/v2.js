function Journal(){

    const { createLogger, format } = require('winston');
    const { combine, timestamp, label, prettyPrint } = format;

    const DailyRotateFile = require('winston-daily-rotate-file');

    var transport = new DailyRotateFile({
        filename: '/tmp/points-cli/logs/%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        level: 'info',
        maxSize: '20m'
    });
       
    const logger = createLogger({
        format: combine(          
          timestamp(),
          prettyPrint()
        ),
        transports: [transport]
      });

    this.logInfo = function(source, info){
        logger.log('info', {"source" : source, "message": info})
    } 

    this.logError = function(source, error){
        logger.log("error", {"source" : source, "message": error});
    } 

    this.logDebug = function(source, message){
        logger.log("debug", {"source" : source, "message": message})        
    }

}

// ensures the same instance is used by all consumers
module.exports = new Journal();