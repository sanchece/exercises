//first "npm install axios"

const axios= require('axios');
const fs=require('fs');
const process=require('process');


function cat(path){
    fs.readFile(path, 'utf8', function(err,data){
        if (err){
            console.error(err);
            process.exit(1);
        }
        else{
            console.log(`file content: ${data}`)
        }
    });
}

async function webCat(url){
    let website= await axios.get(url);
    console.log(website.data);
}

let path=process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
  } else {
    cat(path);
  }
