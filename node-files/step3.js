//first "npm install axios"

const axios= require('axios');
const fs=require('fs');
const process=require('process');


function cat(path,out){
    fs.readFile(path, 'utf8', function(err,data){
        if (err){
            console.error(err);
            process.exit(1);
        }
        else{
            output(`file content: ${data}`,out)
        }
    });
}

async function webCat(url,out){
    let website= await axios.get(url);
    output(website,out)
}

function output(txt,out){
    if(out){
        fs.writeFile(out,txt, 'utf8',function(err){
            if(err){
                console.log(err);
                process.exit(1);
            }});
    }
    else{
        console.log(txt);
    }
}
let path;
let out;


if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}
if (path.slice(0, 4) === 'http') {
    webCat(path,out);
  } else {
    cat(path,out);
  }
