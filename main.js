// Main

var gleanerParser = (function () {
    return {
        parse: function (trace) {
            return {
                actor: "1",
                verb: trace.event,
                object: trace.target || trace.value
            }
        }
    }
})();

var gleanerConverter = new Converter(gleanerParser);

// Actors
var actor = new Actor();
actor.setAccount("http://www.example.com", "mario");
actor.setName("Mario");
gleanerConverter.registerActor("1", actor);

// Verbs
var entered = new Verb("http://example.com/verbs#entered");
entered.addDisplay("en-US", "entered");
entered.addDisplay("es-ES", "entró");
gleanerConverter.registerVerb("zone", entered);

var variable = new Verb("http://example.com/verbs#updated");
variable.addDisplay("en-US", "updated");
variable.addDisplay("es-ES", "actualizó");
gleanerConverter.registerVerb("var", variable);

var interaction = new Verb("http://example.com/verbs#interacted");
interaction.addDisplay("en-US", "interacted");
interaction.addDisplay("es-ES", "interactuó");
gleanerConverter.registerVerb("interaction", interaction);

var choice = new Verb("http://example.com/verbs#chose");
choice.addDisplay("en-US", "chose");
choice.addDisplay("es-ES", "escogió");
gleanerConverter.registerVerb("choice", choice);


// Objects
var zoneType = "http://example.com/objects#zone";
var variableType = "http://example.com/objects#variable";
var questionType = "http://example.com/objects#question";
var enemyType = "http://example.com/objects#enemy";

for (var i = 1; i <= 8; i++) {
    for (var j = 1; j <= 4; j++) {
        var phase = new Activity("http://example.com/games/SuperMarioBros/Zones/" + i + "-" + j);
        phase.setType(zoneType);
        phase.addName("en-US", "World " + i + "-" + j);
        if (j == 4) {
            phase.addDescription("en-US", "Boss fight against Bowser");
        }
        gleanerConverter.registerObject(i + "-" + j, phase);
    }
}

var variables = ['lifes', 'score', 'coins'];

variables.forEach(function (name) {
    var varObject = new Activity("http://example.com/games/SuperMarioBros/Vars/" + name);
    varObject.setType(variableType);
    gleanerConverter.registerObject(name, varObject);
});

var questions = ['number_players'];

questions.forEach(function (question) {
    var questionObject = new Activity("http://example.com/games/SuperMarioBros/Questions/" + question);
    questionObject.setType(questionType);
    gleanerConverter.registerObject(question, questionObject);
});

var enemies = ['goomba', 'koopa', 'bowser'];
enemies.forEach(function (enemy) {
    var enemyObject = new Activity("http://example.com/games/SuperMarioBros/Enemies/" + enemy);
    enemyObject.setType(enemyType);
    gleanerConverter.registerObject(enemy, enemyObject);
});

var convert = function(){
    var traces = JSON.parse(document.getElementById('traces').value);
    var statements = gleanerConverter.parse(traces);
    document.getElementById('xapi').value = JSON.stringify(statements, null, 2);
};