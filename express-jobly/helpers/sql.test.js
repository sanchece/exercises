const {sqlForPartialUpdate} =require("./sql");
const { BadRequestError } = require("../expressError");
describe("test sqlForPartialUpdate function",function(){
    test("test functional sqlForPartialUpdate function",function(){
        const dataToUpdate={
            name:"Skynet",
            description:"AI technology ",
            numEmployees:100,
            logoUrl:"https://static.wikia.nocookie.net/terminator/images/e/e2/Skynet_logo.jpg"
        };
        const jsToSql= {
            numEmployees: "num_employees",
            logoUrl: "logo_url",
          };
        
        let SQLres= sqlForPartialUpdate(dataToUpdate,jsToSql);
        expect(SQLres).toEqual({
            setCols:'"name"=$1, "description"=$2, "num_employees"=$3, "logo_url"=$4',
            values:["Skynet","AI technology ",100,"https://static.wikia.nocookie.net/terminator/images/e/e2/Skynet_logo.jpg"]

        });
    })
    test("test no data error",function(){
        try {
            let SQLres= sqlForPartialUpdate({},{});
          } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
          } 

    })
})