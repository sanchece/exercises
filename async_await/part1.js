
let luckyNum=300;
async function part1And2(){
    let res=await axios.get(`http://numbersapi.com/${luckyNum},${luckyNum+1},${luckyNum+2}`);
    console.log(res)
}

async function part3(){
    let facts = await Promise.all(
        Array.from({ length: 4 }, () =>
         axios.get(`http://numbersapi.com/${luckyNum}`)
      ));
      facts.forEach(card => {
        console.log(card.data)
      });
}