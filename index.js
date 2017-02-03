var fs = require('fs'),
    xml2js = require('xml2js'),
    JSONPath = require('JSONPath'),
    fileSave = require('file-save'),
    jp = require('jsonpath'),
    tempJSON = [];

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/claim837.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
        tempJSON = JSON.stringify(result);
        //console.log(tempJSON);
        fileSave('./claim837.json')
            .write(tempJSON, function () {
                var JSpath = "";
                JSpath = jp.paths(tempJSON, "$.Interchange.ISA[*]");
                console.log(JSpath);
            })
            .end()
            .error(function () {
                console.log('error goes here');
            })
        /*.finish(function () {
            console.log('write finished.')
        })*/
        ;
    });
});