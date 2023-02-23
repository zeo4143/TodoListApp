import React, { useEffect, useReducer } from "react";
import ToDoInputForm from "./Components/TodoInputForm";
import Todo from "./Components/Todo"
import "./App.css"


const initialState = localStorage.getItem('todos') == null ? [] : JSON.parse(localStorage.getItem('todos'))
const reducer = (todos, action) => {

  if(action.type === "ADD_TODO") {
     return [...todos, action.payload.newTodo]
  }

  if(action.type === "Delete_Todo") {
    return todos.filter((Todo) => Todo.id !== action.payload.id )
  }

  if(action.type === "Edit_Todo") {
    return todos.map((Todo) => {
      if(Todo.id === action.payload.id ) {
        return {...Todo, title: action.payload.editedTodo}
      }
      else {
        return Todo
      }
    })
  }

  
  if(action.type === "Delete_All") {
    return []
  }
  return todos
}

  

export default function App() {

  const [todos, dispatch] = useReducer(reducer,initialState)
  
  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])
  
  
  function handleDeleteAll(e) {
    e.preventDefault()
    confirm('Are you Sure..?') ? dispatch({type:"Delete_All"}) : ""
    
    
  }
  return(
    <div className="container">
      <div className="part--1">
        <h1>TodoList  App</h1>
        <ToDoInputForm todos = {todos} dispatch = {dispatch} />
      </div>
      <div className="part--2">
        <div className="part--2-0">
                {todos.map((todoList) => {
                  return(
                    <Todo {...todoList} dispatch = {dispatch} id = {todoList.id}  key = {todoList.id}/>
                    )
                  })}
      
        </div>
            {(todos.length > 1) && <button className="button" onClick={handleDeleteAll}> Delete all Tasks..☑️ </button>}
      </div>
    
        
  
    </div>
  )
}