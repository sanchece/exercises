/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let newChains = new Map();
    for (let i = 0; i < this.words.length; i += 1) {
      let thisWord = this.words[i];
      let nextWord = this.words[i + 1] || null;
      if (newChains.has(thisWord)) newChains.get(thisWord).push(nextWord);
      else newChains.set(thisWord, [nextWord]);
    }

    this.newChains = newChains;
  }

  static getRandKey(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }


  makeText(numWords = 100) {
    let keysFromNewChains = Array.from(this.newChains.keys());
    let key = MarkovMachine.getRandKey(keysFromNewChains);
    let output = [];
    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.getRandKey(this.newChains.get(key));
    }

    return output.join(" ");
  }
}
module.exports = {
  MarkovMachine,
};