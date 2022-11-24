import {useState} from "react";

import {db} from '../firebase'
import {doc, updateDoc, deleteDoc} from 'firebase/firestore'

import {AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineCalendar, AiOutlineFile} from 'react-icons/ai'

export const TodoItem = ({todos, setTodos}) => {

  const [edit, setEdit] = useState(null)
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [fileValue, setFileValue] = useState('')

  const removeTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id))
  }

  const completeTodo = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  const editTodo = ({id, title, description, date, file}) => {
    setEdit(id)

    setTitleValue(title)
    setDescriptionValue(description)
    setDateValue(date)
    setFileValue(file)
  }

  const saveUpdatedTodo = async (id ,title, description, date, file) => {

    await updateDoc(doc(db, "todos", id.id),{
      titleValue: title,
      descriptionValue: description,
      dateValue: date,
      fileValue: file
    })
    setEdit(false)
  }

return (
    <>
      {
        todos.map((item, index) => (
          <div key={index} >
            {edit === item.id ?
              <>
                <input onChange={(e) => setTitleValue(e.target.value)} value={titleValue} type="text"/>
                <input onChange={(e) => setDescriptionValue(e.target.value)} value={descriptionValue} type="text"/>
                <input onChange={(e) => setDateValue(e.target.value)} value={dateValue} type="date"/>
                <input onChange={(e) => setFileValue(e.target.value)} value={fileValue} type="file"/>
                <button onClick={() => saveUpdatedTodo(item.id)}>Сохранить</button>
              </>
            :
              <div className="todo">
                <h3>{item.titleValue}</h3>
                <p>{item.descriptionValue}</p>
                <div className="servicesInfo">
                  <span> <AiOutlineCalendar className="calendar"/> {item.dateValue}</span>
                  <span> <AiOutlineFile className="file"/> {item.fileValue}</span>
                </div>
                <button className="green" onClick={() => completeTodo(item.id)}><AiOutlineCheck/></button>
                <button className="red" onClick={() => removeTodo(item.id)}><AiOutlineDelete/></button>
                <button className="orange" onClick={() => editTodo({...item})}><AiOutlineEdit/></button>
              </div>}
          </div>
        ))
      }
    </>
  )
}