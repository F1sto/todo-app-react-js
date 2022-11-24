import {useEffect, useState} from "react";

import {db} from '../firebase'
import {collection, query, onSnapshot} from "firebase/firestore";

import {TodoItem} from "./TodoItem";
import {AddTodo} from "./AddTodo";

export const TodoList = () => {

  const [todos, setTodos] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosList = []
      querySnapshot.forEach((doc) => {
        todosList.push({...doc.data(), id: doc.id})
      })
      setTodos(todosList)
    })
    return () => unsub()
  }, [])

  return (
    <div>
      <AddTodo todos={todos} setTodos={setTodos}/>
      {todos.map((item, index) => (
          <TodoItem key={index} todos={todos} setTodos={setTodos}/>
        ))
      }
    </div>
  )
}