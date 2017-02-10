var JSONPath = require('JSONPath'),
    traverse = require('traverse'),
    transform = require(__dirname + '/mappers/transformation_mapper.js');

module.exports.transform = function (sourceJson, targetJson, mapper) {
    for (var count = 0; count < 1; count++) {
        traverse(targetJson).forEach(function (result) {
            var JSpathSource = JSONPath({
                json: sourceJson,
                path: mapper.JSONpaths[0].sourcePath
            });
            var JSpathDestination = JSONPath({
                json: targetJson,
                path: mapper.JSONpaths[0].destinationPath
            });
/*            console.log(result.Student.marks[count].score);
            console.log(JSpathSource[count].PER04);
            console.log(JSpathDestination);*/
            if (result.Student.marks[count].subject == "")
                this.update(result.Student.marks = JSpathSource);
            console.log(JSON.stringify(targetJson));
        });
    }
    return targetJson;
}

/*
[ { PER01: [ 'IC' ],
    PER02: [ 'JERRY' ],
    PER03: [ 'TE' ],
    PER04: [ '3055552222' ],
    PER05: [ 'EX' ],
    PER06: [ '231' ] } ]
[ { subject: '', score: 0 } ]*/

/*
var assert = require('assert');
var objMapToArr = require('object-map-to-array');
 
var o1 = {
  a: 1,
  b: -1,
  c: 0,
  d: 42
};
 
objMapToArr(o1, function (n) {
  return { id: k, value: n };
}); /* => `[
  [ id: 'a', value: 1 ],
  [ id: 'b', value: -1 ],
  [ id: 'c', value: 0 ],
  [ id: 'd', value: 42 ]
]` */