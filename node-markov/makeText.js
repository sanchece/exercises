const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function markovIt(text) {
    let textFed = new markov.MarkovMachine(text);
    console.log(textFed.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            markovIt(data);
        }
    });

}

async function makeURLText(url) {
    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    generateText(resp.data)
}

let method=process.argv[2]
let path=process.argv[3]

if (method === "file") {
    makeText(path);
}

else if (method === "url") {
    makeURLText(path);
}

else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}