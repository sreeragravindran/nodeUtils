
/* 
    Usage : node print.js inputFile.json property1,property2 
*/ 
var fs = require('fs');
var inputFilePath = process.argv[2];
var properties = process.argv[3].split(","); 
var inputJsonArray = JSON.parse(fs.readFileSync(inputFilePath));


inputJsonArray.forEach(function(element){
    var temp = ""; 
    properties.forEach(function(property){
        temp = temp + element[property] + ",";   
    })
    console.log(temp.substring(0, temp.length - 1));
})

