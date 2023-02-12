import React, { useState } from "react";
import {v4 as uuid} from "uuid"

import "./TodoInputForm.css"


export default function ToDoInputForm(props){

    const [inputTodos, setInputTodos] = useState([])
    const [addDescription, setAddDescription] = useState([])
    
    let newTodo = ({
        id : uuid(), 
        title : inputTodos,
        description : addDescription,
        status : false
    })

    function handleSubmit(e){
        e.preventDefault()
        props.dispatch({type: "ADD_TODO", payload: {newTodo: newTodo}}) 
        setInputTodos("") 
        setAddDescription("")
        

    }



    return (
        <div>
            <form  className="inputForm" onSubmit={handleSubmit}>
                <div className="inputs">
                    <label htmlFor="todoInput1">Set Your Goal..🎯</label>
                    <input 
                        type="text"
                        placeholder="Assign your Task.."
                        value={inputTodos} 
                        onChange={(e) => {
                            setInputTodos(e.target.value)
                    }}/>
                </div>

                <div className="inputs">
                    <label htmlFor="todoInput2"> Add Description🧾</label>
                    <input 
                        type="text"
                        id="todoInput2"
                        placeholder="Add A Brief Note to your target..."
                        value={addDescription} 
                        onChange={(e) => {
                            setAddDescription(e.target.value)
                    }}/>
                </div>
                {inputTodos.length > 0 && <div className="submit">
                    <input type="submit" value="Add TODO"  />
                </div> }

            </form>
            

        </div>
        
    )
}