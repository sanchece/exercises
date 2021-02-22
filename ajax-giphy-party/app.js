console.log("Let's get this party started!");
const $gifArea=$("#area");

async function getGiphy(gif){
    const res= await axios.get(`http://api.giphy.com/v1/gifs/search`,{
        params:{
            q:gif,
            api_key:"NtEzWT15AE9P6SkxqCjunZ2RNz5vCSdE"
        }});
    return res;
}

//getGiphy("happy");

$("#submit").on("click",async function(e){
    e.preventDefault();
    let userInput=$("#userInput").val();
    let gif= await getGiphy(userInput);
    let $newGif = $("<img>", {
        src:gif.data.data[0].images.original.url,
        class: "w-10"
      });
      $gifArea.append($newGif);  
    
})

