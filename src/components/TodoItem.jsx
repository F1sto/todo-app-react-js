import {useEffect, useState} from "react"; //useEffect not used

import {db} from '../firebase'
import {doc, updateDoc, deleteDoc} from 'firebase/firestore'

import {AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineFile} from 'react-icons/ai'
import {BsFillCalendarXFill, BsFillCalendarDateFill} from 'react-icons/bs'
import dayjs from "dayjs";

export const TodoItem = ({todos}) => {
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [fileValue, setFileValue] = useState('')

  const [edit, setEdit] = useState(null)
  const [isOverdue, setIsOverdue] = useState(dayjs(new Date()).unix()) //setIsOverdue not used

  const completeTodo = async (todo, id) => { // id useEffect. todo - не todo, а его id, посмотри, что ты передаешь в параметрах при вызове. Передай todo, а в 'updateDoc' передай todo.id
    await updateDoc(doc(db, "todos", todo), {
      completed: !todo.completed
    })
  }

  const removeTodo = async (todo, id) => {
    await deleteDoc(doc(db, "todos", todo))
  }

  const editTodo = (id) => {
    setEdit(id)
  }

  const saveUpdatedTodo = async (e, todo) => {
    e.preventDefault()

    await updateDoc(doc(db, "todos", todo ),{
      titleValue: titleValue,
      descriptionValue: descriptionValue,
      dateValue: dayjs(dateValue).format('DD.MM.YYYY'),
      fileValue: fileValue
    })
    setEdit(null)
  }

return (
    <>
      {
        todos.map((item) => (
          <div key={item.id} >
            {edit === item.id ?
              <form onSubmit={(e) => saveUpdatedTodo(e, item.id)}  className="form">
                <input onChange={(e) => setTitleValue(e.target.value)} value={titleValue} type="text"/>
                <input onChange={(e) => setDescriptionValue(e.target.value)} value={descriptionValue} type="text"/>
                <input onChange={(e) => setDateValue(e.target.value)} value={dateValue} type="date"/>
                <input onChange={(e) => setFileValue(e.target.value)} value={fileValue} type="file" className="inputFile"/>
                <input type="submit" value="Сохранить"/>
              </form>
            :
              <div className={item.completed ? "todoCompleted todo" : "todo "}>
                <h3>{item.titleValue}</h3>
                <p>Описание: <br/> {item.descriptionValue}</p>

                  <div className="servicesInfo">
                    {
                      item.dateValue !== 'Invalid Date' ?
                      <span> {isOverdue > dayjs(new Date(item.dateValue)).unix() ? <BsFillCalendarDateFill className="calendar"/> : <BsFillCalendarXFill className="danger"/>}  {item.dateValue}</span> : ''
                    }

                    {
                      item.fileValue !== '' ?
                        <span> <AiOutlineFile className="file"/> {item.fileValue}</span> : ''
                    }
                  </div>

                <button className={item.completed ? 'btn green' : 'btn simpleBtn'} onClick={() => completeTodo(item.id)}><AiOutlineCheck/></button>
                <button className=" btn red" onClick={() => removeTodo(item.id)}><AiOutlineDelete/></button>
                <button className=" btn orange" onClick={() => editTodo(item.id)}><AiOutlineEdit/></button>
              </div>}
          </div>
        ))
      }
    </>
  )
}
