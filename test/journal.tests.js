var expect = require('chai').expect;
var journal = require("../journal"); 

describe("journal", function(){
    it("should be able to log info", function(){
        journal.clear();
        journal.logInfo("test/journal.tests", "test info log");
        expect(journal.getLogs()[0].type).to.be.equal("info");
        
    })

    it("should be able to log error", function(){
        journal.clear();
        journal.logError("test/journal.tests", "test error log");
        expect(journal.getLogs()[0].type).to.be.equal("error");
        
    })

    it("should be able to clear the journal", function(){
        journal.logError("test/journal.tests", "test error log");
        journal.logInfo("test/journal.tests", "test info log");
        expect(journal.getLogs().length).to.be.greaterThan(1);

        journal.clear();
        expect(journal.getLogs().length).to.be.equal(0);
    })

    it("should be able to find log in the journal", function(){
        journal.clear();
        journal.logError("test/journal.tests", "test error log");
        journal.logInfo("test/journal.tests", "test info log");
        journal.logInfo("test/journal.tests", {"eventName" : "test"}); 

        expect(journal.containsInfo("test info log")).to.be.true;
    })

    it("should be able to find error in the journal", function(){
        journal.clear();
        journal.logError("test/journal.tests", "test error log");
        journal.logInfo("test/journal.tests", "test info log");

        expect(journal.containsError("test erro")).to.be.true;
    })
})