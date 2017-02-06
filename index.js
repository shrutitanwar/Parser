var fs = require('fs'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser(),
    fileSave = require('file-save'),
    restify = require('restify'),
    mapper = require(__dirname + '/json/mapper.json'),
    transformation = require('./transformation.js');

var server = restify.createServer({
    name: "XML-JSON",
});

server.get("/transform", function (req, res) {
    fs.readFile(__dirname + '/claim837.xml', function (err, data) {
        parser.parseString(data, function (err, result) {
            fileSave(__dirname + '/json/claim837.json')
                .write(JSON.stringify(result), function () {
                    var updatedJSON = transformation.transform(result, mapper);
                    res.send(JSON.stringify(updatedJSON));
                })
                .end()
                .error(function () {
                    console.log('File not saved!');
                });
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