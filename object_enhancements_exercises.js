
//Object Enhancements

const createInstructor=(firstName, lastName)=>({firstName, lastName});

let favoriteNumber = 42;
const instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!"
}

const instructor2={
    firstName:"colt",
    sayHi(){return "hi"},
    sayBye(){return this.firstName +"bye";}
}


const createAnimal=(species,verb,noise)=>({
    species, [verb](){return noise}
})