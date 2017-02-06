var JSONPath = require('JSONPath'),
    traverse = require('traverse');

module.exports.transform = function (json, mapper) {
    traverse(json).forEach(function (result) {   
        var JSpath = JSONPath({
            json: json,
            path: mapper.JSONpaths[0].jsonPath
        });
        if (result == JSpath) this.update(result = mapper.JSONpaths[0].value);
    });
    return json;
}