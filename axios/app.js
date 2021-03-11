// const firstReq= new XMLHttpRequest();
// firstReq.addEventListener('load', function(){
//     const data = JSON.parse(this.responseText);
//     for (let planet of data.results) {
//       console.log(planet.name)
//     }
//     // console.log(data);
// });
// firstReq.addEventListener('error', function(){
//     console.log("error!!!");
// })
// firstReq.open('GET', 'https://swapi.dev/api/planets/');
// firstReq.send();
// console.log("sending request");


//async
async function getData(){
    const response=await axios.get("https://swapi.dev/api/planets/");
    console.log(response);

    console.log("this line is after axios")

}
// getData()

async function getLaunches(){
    const res=await axios.get("https://api.spacexdata.com/v3/launches/upcoming");
    const ul=document.querySelector("#launches");
    for(let launch of res.data){
        const newLi= document.createElement("LI");
        newLi.innerText=launch.mission_name;
        newLi.innerHTML+=` -> ${launch.rocket.rocket_name}`
        ul.append(newLi);
        console.log(launch.mission_name);
        console.log(launch.rocket.rocket_name);
    } 
}
// getLaunches();

// async function getUsers(){
//     const res=await axios.get('https://hack-or-snooze-v3.herokuapp.com/users');
//     console.log(res);
// }

// async function signUp(name,username,password){
//     const res=await axios.post("https://hack-or-snooze-v3.herokuapp.com/signup", 
//     {user:{name,username,password}})
//     console.log(res);
// }
// // 

//  async function logIn(username,password){
//      const res=await axios.post("https://hack-or-snooze-v3.herokuapp.com/login", 
//      {user:{username,password}})
//      console.log(res);
//  }
// // getUsers();
// //  signUp("naombre","butterchikenr","1234pass");
// logIn('butterschicken', '238197sadhj');
  
  
async function getUsers(token) {
    const res = await axios.get('https://hack-or-snooze-v3.herokuapp.com/users', { params: { token } });
    console.log(res);
  }
  
  async function signUp(username, password, name) {
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/signup', { user: { name, username, password } })
    console.log(res);
  }
  
  async function login(username, password) {
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/login', { user: { username, password } })
    console.log(res);
    return res.data.token;
  }
  // getUsers();
  // signUp('butterschicken', '238197sadhj', 'butters the chicken')
  
  async function getUsersWithAuth() {
    const token = await login('butterschicken', '238197sadhj');
    getUsers(token);
  }
  
  async function createStory() {
    const token = await login('butterschicken', '238197sadhj');
    const newStory = {
      token,
      story: {
        author: 'Butters',
        title: 'BOCK BOCK BOCK',
        url: 'http://chickens4lyfe.com'
      }
    }
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/stories', newStory);
    console.log(res);
  }
  
  // getUsersWithAuth();
  createStory();
  
  
  
  
  