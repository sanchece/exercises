import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
const NewTodoForm = ({addTodo}) => {
    const [TodoData,setTodoData]= useState({
        todo:""
    })

    const handleChange=(e)=>{
        const {name, value}=e.target
        setTodoData((TodoData=>({...TodoData,[name]:value})))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        addTodo({...TodoData,id:uuid()})
        setTodoData({        id:"",        todo:""})


    }
    
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="todo">New Todo:</label>
        <input onChange={handleChange} id="todo" name="todo" ></input>
      </div>
      <button >Add</button>
    </form>
  );
};

export default NewTodoForm;


