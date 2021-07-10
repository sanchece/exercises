function part1(){
    // 1,2
    let luckyNumber=300;
    // axios.get(`http://numbersapi.com/${luckyNumber},${luckyNumber+1},${luckyNumber+2}`)
    // .then(res => {
    //     console.log(`funfact:${res.data[luckyNumber]}`)
    //     console.log(`funfact:${res.data[luckyNumber+1]}`)
    //     console.log(`funfact:${res.data[luckyNumber+2]}`)
    // })
    // .catch(()=>console.log("error!"))

    //3

    let facts=[];
    for(i=0;i<4;i++){
        facts.push(
            axios.get(`http://numbersapi.com/${luckyNumber}`)
        )
        // axios.get(`http://numbersapi.com/${luckyNumber}`)
        // .then(res=>facts.push(res))
    }

    Promise.all(facts)
    .then(facts=>(
        facts.forEach(fact=>console.log(fact.data))
    ))
    .catch(err => console.log("error"));
    
}