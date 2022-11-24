import styles from './TodoItem.module.scss'
import {useState} from "react";

import {AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineCalendar, AiOutlineFile} from 'react-icons/ai'

export const TodoItem = ({todos, setTodos}) => {

  const [edit, setEdit] = useState(null)
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [fileValue, setFileValue] = useState('')

  const removeTodo = (id) => {
    let newTodos = [...todos].filter(item => item.id !== id)
    setTodos(newTodos)
  }

  const closeTodo = (id) => {
    let newTodos = [...todos].map(item => {
      if(item.id === id) {
        item.overdue = !item.overdue
      }
      return item
    })
    setTodos(newTodos)
  }

  const editTodo = ({id, title, description, date, file}) => {
    setEdit(id)

    setTitleValue(title)
    setDescriptionValue(description)
    setDateValue(date)
    setFileValue(file)
}

  const saveEditTodo = (id) => {
    let newTodos = [...todos].map(item => {
      if(item.id === id) {
        item.title = titleValue
        item.description = descriptionValue
        item.date = dateValue
        item.file = fileValue
      }
      return item
    })
    setTodos(newTodos)
    setEdit(false)
  }

return (
    <>
      {
        todos.map((item, index) => (
          <div key={index} className={styles.todo}>
            {edit === item.id ?
              <>
                <input onChange={(e) => setTitleValue(e.target.value)} value={titleValue} type="text"/>
                <input onChange={(e) => setDescriptionValue(e.target.value)} value={descriptionValue} type="text"/>
                <input onChange={(e) => setDateValue(e.target.value)} value={dateValue} type="date"/>
                <input onChange={(e) => setFileValue(e.target.value)} value={fileValue} type="file"/>
                <button onClick={() => saveEditTodo(item.id)}>Сохранить</button>
              </>
            :
              <>
                <h3>{item.title}</h3>
                <p>Описание: {item.description}</p>
                <div className={styles.serviceInformation}>
                  <p> <AiOutlineCalendar/> {item.date}</p>
                  <p> <AiOutlineFile/> {item.attachedFiles} </p>
                </div>
                <button onClick={() => closeTodo(item.id)}><AiOutlineCheck style={styles.btnDone}/></button>
                <button onClick={() => removeTodo(item.id)}><AiOutlineDelete/></button>
                <button onClick={() => editTodo({...item})}><AiOutlineEdit/></button>
              </>}
          </div>
        ))
      }
    </>
  )
}