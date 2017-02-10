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
