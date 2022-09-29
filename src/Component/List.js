import React, { useState, useEffect } from "react";
import './List.css'

/////////  variables are update the todos

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

//////////////// Use Local storage to store todo

  useEffect(()=>{
      if(localStorage.getItem("localTodos")){
          const storedTodo = JSON.parse(localStorage.getItem("localTodos"));
          setList(storedTodo);
      }
  },[])


  /////////// Create or Add todo block

  const addTodo = (e) => {
    if (todo) {
      const newList = { id: new Date().getTime().toString(), title: todo };
      setList([...list, newList]);
      localStorage.setItem("localTodos", JSON.stringify([...list, newList]));
      setTodo("");
    }
  };

  ////////////////// Delete or remove todo block

  const deleteTodo = (todo)=>{
      const deleted = list.filter((t)=>t.id !== todo.id);
      setList(deleted);
      localStorage.setItem("localTodos", JSON.stringify(deleted))
  }

  /////////////// Cleare all Todos 

  const clearTodo=()=>{
      setList([]);
      localStorage.removeItem("localTodos");
  }


  return (
    <div className="body">
    <div className="container">
      <h1>Store Your Todo LifeTime !</h1>
      <div className="input-feild">
        <input
          name="todo"
          type="text"
          value={todo}
          placeholder="Write your task..."
          onChange={(e) => setTodo(e.target.value)}
        />
         <button onClick={addTodo} className='add-btn'>
          Add Todo
        </button>

      </div>

{/*  Add if else condition of list lengths  */}
      <div className="popshow">
        Your
        {!list.length
          ? " Create Todo are Show Here"
          : list.length === 1
          ? " 1 todo"
          : list.length > 1
          ? ` ${list.length} todo`
          : null}
      </div>

      {/* using map function to delete todo  */}

      {list.map((todo) => (
        <div key={todo.id} className='show-todo'>
                <span>
                    {todo.title}
                </span>
                <button onClick ={()=> deleteTodo(todo)}>
                    delete
                    </button>
            <div>
            </div>
        </div>
      ))}

      {/* using map function to delete todo  */}

      {!list.length ? null:(
          <div className="clr-btn">
              <button onClick={()=>clearTodo()}>
                  Clear All
              </button>
          </div>
      )}
    </div>
    </div>
  );
}

export default Todo;