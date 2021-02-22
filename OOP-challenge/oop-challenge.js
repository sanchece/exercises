class Vehicle{     ///class
    constructor(make,model,year){  
        this.make=make; // property
        this.model=model;
        this.year=year;
    }
    honk(){   // method
        console.log("beep")
    }
    toString(){ //method
        console.log(`This vehicle is a ${this.make} ${this.model} from ${this.year}`);
    }
}

class Car extends Vehicle{ //extension to vehicle class
    constructor(make,model,year){
        super(make,model,year);   
        this.numWheels=4;
    }    
}

class Motorcycle extends Vehicle{
    constructor(make,model,year){
        super(make,model,year);
        this.numWheels=2; //property
        this.revEngine();
    }
    revEngine(){
        console.log("Vroom1");
    }
}

class Garage{
    constructor(capacity){
        this.capacity=capacity;
        this.vehicles=[];
    }
    add(vehicle){
        if(!(vehicle instanceof Vehicle))
        if(this.vehicles.length<this.capacity){
        this.vehicles.push(vehicle);
        console.log("vehicle added");
        }
        else{
            console.log("sorry,we're full");
        }
    }
}

 // instance 