import {useEffect, useState} from "react";

import {db} from '../firebase'
import {doc, updateDoc, deleteDoc} from 'firebase/firestore'

import {AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineCalendar, AiOutlineFile} from 'react-icons/ai'
import {BsFillCalendarXFill} from 'react-icons/bs'
import dayjs from "dayjs";

export const TodoItem = ({todos}) => {
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [fileValue, setFileValue] = useState('')

  const [edit, setEdit] = useState(null)
  const [complete, setComplete] = useState(false)
  const [isOverdue, setIsOverdue] = useState(dayjs(new Date()).format('DD.MM.YYYY'))

  const completeTodo = async (id) => {
    setComplete(!complete)
    await updateDoc(doc(db, "todos", id.id), {
      completed: !id.completed,
    })
  }

  const removeTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id))
  }

  const editTodo = (id) => {
    setEdit(id)
  }

  const saveUpdatedTodo = async ({e, id ,title, description, date, file}) => {
    e.preventDefault()
    await updateDoc(doc(db, "todos", id.id),{
      titleValue: title,
      descriptionValue: description,
      dateValue: date,
      fileValue: file
    })
    setEdit(null)
  }

return (
    <>
      {
        todos.map((item) => (
          <div key={item.id} >
            {edit === item.id ?
              <form className="form">
                <input onChange={(e) => setTitleValue(e.target.value)} value={titleValue} type="text"/>
                <input onChange={(e) => setDescriptionValue(e.target.value)} value={descriptionValue} type="text"/>
                <input onChange={(e) => setDateValue(e.target.value)} value={dateValue} type="date"/>
                <input onChange={(e) => setFileValue(e.target.value)} value={fileValue} type="file"/>
                <button onClick={() => saveUpdatedTodo({...item})} >Сохранить</button>
              </form>
            :
              <div className={complete ? "todo" : "todo todoCompleted"}>
                <h3>{item.titleValue}</h3>
                <p>Описание: <br/> {item.descriptionValue}</p>

                  <div className="servicesInfo">
                    {
                      item.dateValue !== 'Invalid Date' ?
                      <span> {isOverdue === item.dateValue ? <AiOutlineCalendar className="calendar"/> : <BsFillCalendarXFill className="calendar"/>}  {item.dateValue}</span> : ''
                    }

                    {
                      item.fileValue !== '' ?
                        <span> <AiOutlineFile className="file"/> {item.fileValue}</span> : ''
                    }
                  </div>

                <button className={complete ? 'btn simpleBtn' : 'btn green'} onClick={() => completeTodo(item.id)}><AiOutlineCheck/></button>
                <button className=" btn red" onClick={() => removeTodo(item.id)}><AiOutlineDelete/></button>
                <button className=" btn orange" onClick={() => editTodo(item.id)}><AiOutlineEdit/></button>
              </div>}
          </div>
        ))
      }
    </>
  )
}