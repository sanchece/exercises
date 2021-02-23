const submit =document.querySelector("#todo");
const list= document.querySelector('ul');

const saved=JSON.parse(localStorage.getItem('todos')) || [];
for(let save of saved){
    const newTodo = document.createElement('li');
    newTodo.innerText= save.task;
    const newBtn= document.createElement('button');
    newBtn.innerText="Remove this Todo";
    list.append(newTodo);
    newTodo.append(newBtn);
}

submit.addEventListener('submit',function(e){
    e.preventDefault();

    const newTodo = document.createElement('li');
    newTodo.innerText=input.value;
    let toSave=input.value;

    const newBtn= document.createElement('button');
    newBtn.innerText="Remove this Todo"  
    input.value="";

    list.append(newTodo);
    newTodo.appendChild(newBtn);
  

    saved.push({task:toSave, isDone:false});  
    localStorage.setItem("todos",JSON.stringify(saved));
})

list.addEventListener('click',function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("done");   
    
    }
    else if (e.target.tagName==="BUTTON"){
        e.target.parentNode.remove();     
    }
});






