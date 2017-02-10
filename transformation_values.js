var JSONPath = require('JSONPath'),
    traverse = require('traverse'),
    transform = require(__dirname + '/mappers/transformation_mapper.js');

module.exports.transform = function (json, mapper) {
    for (var count = 0; count < mapper.JSONpaths.length; count++) {
        var tFunction = mapper.JSONpaths[count].transformFunction;
        traverse(json).forEach(function (result) {
            var JSpath = JSONPath({
                json: json,
                path: mapper.JSONpaths[count].jsonPath
            });
            if (result == JSpath) this.update(result = transform[tFunction].call());
        });
    }
    return json;
}

/*{
    "JSONpaths": [{
            "jsonPath": "$.Interchange.FunctionGroup.[*].Transaction[*].Loop[*].PER[*].PER02[*]",
            "transformFunction": "returnName"
        },
        {
            "jsonPath": "$.Interchange.FunctionGroup.[*].Transaction[*].Loop[*].PER[*].PER03[*]",
            "transformFunction": "returnSurname"
        }
    ]
}*/


/*module.exports.transform = function (sourceJson, targetJson, mapper) {
    console.log(targetJson);
    for (var count = 0; count < 1; count++) {
        traverse(sourceJson).forEach(function (result) {
            var JSpathSource = JSONPath({
                json: sourceJson,
                path: mapper.JSONpaths[0].sourcePath
            });
            var JSpathDestination = JSONPath({
                json: targetJson,
                path: mapper.JSONpaths[0].destinationPath
            });
            if (JSpathDestination == "") {
                this.update(targetJson.Patient.first_name = JSpathSource)
            }
        });
    }
    return targetJson;
}*/