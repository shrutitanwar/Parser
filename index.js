var fs = require('fs'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser(),
    fileSave = require('file-save'),
    restify = require('restify'),
    benchrest = require('bench-rest'),
    mapper = require(__dirname + '/mappers/jsonpath_mapper.json'),
    transformation = require('./transformation.js'),
    targetJson = require(__dirname + '/data/custom_data.json'),
    request = require("request");

var server = restify.createServer({
    name: "XML-JSON",
});

server
    .use(restify.fullResponse())
    .use(restify.bodyParser());

server.post("/transform", function (req, res) {
    var xml = req.body;
    parser.parseString(xml, function (err, result) {
        fileSave(__dirname + '/data/claim837_data.json')
            .write(JSON.stringify(result), function () {
                //stats(result);
                var updatedJSON = transformation.transform(result, targetJson, mapper);
                res.send(JSON.stringify(updatedJSON));
            })
            .end()
            .error(function () {
                console.log('File not saved!');
            });
    });
});

var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
});

function stats(json) {
    var flow = {
        main: [{
            post: 'http://localhost:3000/transform',
            json: json
        }]
    };
    var runOptions = {
        limit: 1, // concurrent connections
        iterations: 1, // number of iterations to perform
        prealloc: 100 // only preallocate up to 100 before starting
    };
    var errors = [];
    benchrest(flow, runOptions)
        .on('error', function (err, ctxName) {
            console.error('Failed in %s with err: ', ctxName, err);
        })
        .on('progress', function (stats, percent, concurrent, ips) {
            console.log('Progress: %s complete', percent);
        })
        .on('end', function (stats, errorCount) {
            console.log('error count: ', errorCount);
            console.log('stats', stats);
        });
}