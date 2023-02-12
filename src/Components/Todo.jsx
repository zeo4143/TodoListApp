import React, { useState } from "react";
import "./Todo.css"



export default function Todo(props) {

    const [undo, setUndo] = useState(true)
    const [editTodo, setEditTodo] = useState(false)
    const [rectifiedTitle, setRectifiedTitle] = useState(props.title)

    function handleClick(e) {
        e.preventDefault()
        setUndo(prevUndo => !prevUndo)
    }

    function handleEdit(e) {
        e.preventDefault()
        setEditTodo(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setEditTodo(false)
        props.dispatch({type : "Edit_Todo", payload : {id: props.id,editedTodo:rectifiedTitle}})    
    }

    function handleDelete(e) {
        e.preventDefault()
        props.dispatch({type : "Delete_Todo", payload : {id: props.id}})   

    }
    

    
    return(
          
        <div className="Todo">
            {editTodo && <div className="editForm">
                <form onSubmit={handleSubmit} className="editForm">
                    <input type="text"
                    placeholder="Edit Your Todo"
                    value={rectifiedTitle}
                    onChange={(e) => {
                        setRectifiedTitle(e.target.value)
                    }}
                    />
                    <input type="submit" value="Rectify" />
                </form>
            </div>}
            
            {!editTodo && <div className="Task">
                <h2>{props.title}</h2>
                {undo && <p>{props.description}</p>}
                <button onClick={handleDelete} className="edit-undo" >Delete</button>
            </div>}
            {undo && <div>
                {!editTodo && <button onClick={handleClick}>Task Completed ✔️</button>}
                <button onClick={handleEdit} className="edit-undo">Edit Form</button>
                

            </div>}
            {!undo && <div >
                <button onClick={handleClick} className="delete">undo</button>
                <img src="../Images/Done.gif" width={250}  />

            </div>}
            
        </div>
        
    )
}