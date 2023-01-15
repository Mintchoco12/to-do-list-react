import React, { useEffect, useRef, useState } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [toDos, setToDos] = useState([])
  const toDoNameRef = useRef()

  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedToDos) setToDos(storedToDos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDos))
  }, [toDos])

  function toggleToDo(id) {
    const newToDos = [...toDos]
    const toDo = newToDos.find(toDo => toDo.id === id)
    toDo.complete = !toDo.complete
    setToDos(newToDos)
  }

  function handleAddToDo(event) {
    const name = toDoNameRef.current.value
    if (name === '') return    console.log(name)
    setToDos(prevToDos => {
      return [...prevToDos, {id: uuidv4(), name: name, complete: false}]
    })   
    toDoNameRef.current.value = null
  }

  function handleClearToDos() {
    const newToDos = toDos.filter(toDo => !toDo.complete)
    setToDos(newToDos)
  }

  return (
    <>
      <ToDoList toDos={toDos} toggleToDo={toggleToDo}/>
      <div>
        <input ref={toDoNameRef} type="text" />
        <button onClick={handleAddToDo}>Add Todo</button>
        <button onClick={handleClearToDos}>Clear Completed</button>
        <div>{toDos.filter(toDo => !toDo.complete).length} left to do</div>
      </div>
    </>
  );
}

export default App;
