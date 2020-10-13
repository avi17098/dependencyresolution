const chai = require('chai');
const app = require('./index');
var expect = chai.expect;
var allTestCriteria = [{
    "tasks": [],
    "dependencies": [],
    "result": [],
},
{
    "tasks": ["a", "b"],
    "dependencies": [],
    "result": ["a", "b"],
},
{
    "tasks": ["a", "b"],
    "dependencies": ["a => b"],
    "result": ["b", "a"]
},
{
    "tasks": ["a", "b", "c", "d"],
    "dependencies": ["a => b", "c => d"],
    "result": ["b", "d", "a", "c"],
},
{
    "tasks": ["a", "b", "c"],
    "dependencies": ["a => b", "b => c"],
    "result": ["c", "b", "a"]
},
{
    "tasks": ["a", "b", "c", "d"],
    "dependencies": ["a => b", "b => c", "c => a"],
    "result": "This is a cyclic dependency."
}
]
// Checking Tasks
function test(acceptance) {
    acceptance.forEach((criterias, index) => {
            console.log("Test Case" + ' ' + (index + 1), criterias)
            if (criterias.result !== "This is a cyclic dependency.") {
                expect(app.assignTaskWithAssociatedDependency(criterias.tasks, criterias.dependencies)).to.eql(criterias.result);
            } else { // if Cyclic
                expect(function() {
                    app.assignTaskWithAssociatedDependency(criterias.tasks, criterias.dependencies)
                }).to.throw(criterias.result);
            }
        });
};
test(allTestCriteria);