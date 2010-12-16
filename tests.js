$(document).ready(function(){  

module("detrompeur")

test("wrapping should surround text with supplied arguments", function() {
  equals(wrap("middle","(",")"),"(middle)");
});

test("wrapWith should replace element text, calling supplied wrapper", function() {
  var element = $("<div>des itérations et un sprint</div>");
  var called = [];
  var wrapper = function(matched,destination) {
    equals(destination,"iteration");
    called.push(matched);
    return wrap(matched,"(",")");
  }
  wrapWith($,element,["it(.?)ration(s*)","sprint"],"iteration",wrapper);
  deepEqual(called,["itérations","sprint"]);
  equal(element.text(),"des (itérations) et un (sprint)");
});

test("wrapAll should iterate over (destination,keywords) pairs", function() {
  var spec = [
    ["bar",["sprint","iteration"]],
    ["foo",["bdd"]]
  ];
  var element = $("<div>du bdd et des sprints</div>");
  var wrapper = function(matched,destination) {return wrap(destination,"(",")");};
  wrapAll($,element,spec,wrapper);
  equal(element.text(),"du (foo) et des (bar)s");
});

test("dictionaryLink should wrap text with a styled link", function() {
  equal("<a rel='iteration' href='base/iteration.html' class='highlighted'>sprint</a>",dictionaryLink("sprint","iteration","base/"));
});


});