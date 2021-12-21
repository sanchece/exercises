// add whatever parameters you deem necessary
function twoArrayObject(keys,values) {
    let obj= keys.reduce((obj,key,i)=>{
        obj[key]=values[i] || null
        return obj
    },{})
    return obj
}

module.exports={twoArrayObject}