var Actor = function () {
    this.objectType = "Agent";
};

Actor.prototype.setAccount = function (homePage, name) {
    this.account = {
        homePage: homePage,
        name: name
    }
};

Actor.prototype.setName = function (name) {
    this.name = name;
};

Actor.prototype.setOpenId = function (openId) {
    this.openid = openId;
};

var Verb = function (id) {
    this.id = id;
};

Verb.prototype.addDisplay = function (lang, value) {
    this.display = this.display || {};
    this.display[lang] = value;
};

var Activity = function (id) {
    this.id = id;
    this.objectType = "Activity";
    this.definition = {};
};

Activity.prototype.setType = function (typeIRI) {
    this.definition.type = typeIRI;
};

Activity.prototype.addName = function (lang, name) {
    this.definition.name = this.definition.name || {};
    this.definition.name[lang] = name;
};

Activity.prototype.addDescription = function (lang, name) {
    this.definition.description = this.definition.description || {};
    this.definition.description[name] = name;
};

var Converter = function (parser) {
    var actors = {};
    var verbs = {};
    var objects = {};

    var generateStatement = function (actorId, verbId, objectId) {
        return {
            actor: actors[actorId],
            verb: verbs[verbId],
            object: objects[objectId]
        }
    };

    return {
        registerActor: function (id, actor) {
            actors[id] = actor;
        },
        registerVerb: function (id, verb) {
            verbs[id] = verb;
        },
        registerObject: function (id, object) {
            objects[id] = object;
        },
        parse: function (traces) {
            var statements = [];
            traces.forEach(function (trace) {
                var result = parser.parse(trace);
                statements.push(generateStatement(result.actor, result.verb, result.object));
                return statements;
            });
            return statements;
        }
    }
};