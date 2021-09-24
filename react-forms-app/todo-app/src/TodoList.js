import NewTodoForm from "./NewTodoForm"
import React, { useState } from "react";

const TodoList=()=>{
    const [Todos,SetTodos]=useState([]);
    const remove=(id)=>{
        SetTodos((Todos)=>Todos.filter(todo=>todo.id!==id));
    }
    const addTodo=(todo)=>{
        console.log(todo);
         
        console.log(Todos);
        SetTodos([...Todos,todo])
    }
    
    let renderedTodos=Todos.map((todo)=>(
        <div>
            <div>{todo.todo}</div>
            <button onClick={()=>{remove(todo.id)}}>X</button>
        </div>      
    ))

    return(
        <div>
            {renderedTodos}
            <NewTodoForm addTodo={addTodo}/>
        </div>
    )
}

export default TodoList;