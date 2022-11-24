import React from "react";
import {useState} from "react";

import styles from './TodoList.scss'

import {TodoItem} from "../TodoItem/TodoItem";
import {AddTodo} from "../AddTodo/AddTodo";

export const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Первая задача',
      description: 'добить все приложение',
      date: '25.11.2022',
      attachedFiles: 'CV',
      done: false,
      overdue: false
    },
    {
      id: 2,
      title: 'Первая задача',
      description: 'добить все приложение',
      date: '25.11.2022',
      attachedFiles: 'CV',
      done: false,
      overdue: false
    },
    {
      id: 3,
      title: 'Первая задача',
      description: 'добить все приложение',
      date: '25.11.2022',
      attachedFiles: 'CV',
      done: false,
      overdue: false
    },
    {
      id: 4,
      title: 'Первая задача',
      description: 'добить все приложение',
      date: '25.11.2022',
      attachedFiles: 'CV',
      done: false,
      overdue: false
    },
    {
      id: 5,
      title: 'Первая задача',
      description: 'добить все приложение',
      date: '25.11.2022',
      attachedFiles: 'CV',
      done: false,
      overdue: false
    }
  ])

  return (
    <div className={styles.container}>
      <AddTodo todos={todos} setTodos={setTodos}/>
      <TodoItem todos={todos} setTodos={setTodos}/>
    </div>
  )
}