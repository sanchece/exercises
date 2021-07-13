const { MarkovMachine }=require("./markov")

describe(' markov machine tests', function(){
    test('testing makesChains', function(){
        let testText=new MarkovMachine("the grizzly in the forest")
        expect(testText.newChains).toEqual(new Map([
            ["the", ["grizzly", "forest"]],
            ["grizzly", ["in"]],
            ["in", ["the"]],
            ["forest", [ null]]]))
    })
})

test('generates semi-predictable text', function () {
    let testMaterial = new MarkovMachine("the grizzly bear");
    let text = testMaterial.makeText();
    expect(["the grizzly bear", "grizzly bear", "bear"]).toContain(text);
  });