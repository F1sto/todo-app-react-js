import React, {useState} from "react";

import {db} from '../firebase'
import {collection, addDoc} from 'firebase/firestore'

import dayjs from "dayjs";

export const AddTodo = () => {
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [fileValue, setFileValue] = useState('')

  const clearForm = () => {
    setTitleValue('')
    setDescriptionValue('')
    setDateValue('')
    setFileValue('')
  }

  const saveUpdatingTodo = async (e) => {
    e.preventDefault()

    await addDoc(collection(db, "todos"), {
      id: dayjs(new Date()).unix(),
      titleValue,
      descriptionValue,
      dateValue: dayjs(dateValue).format('DD.MM.YYYY'),
      fileValue,
      completed: false,
      overdue: false
    })
    clearForm()
  }

  return (
    <form className="form">
        <input onChange={(e) => setTitleValue(e.target.value)} value={titleValue} type="text" placeholder="Заголовок"/>
        <input onChange={(e) => setDescriptionValue(e.target.value)} value={descriptionValue} type="text" placeholder="Описание"/>
        <input onChange={(e) => setDateValue(e.target.value)} value={dateValue} type="date" />
        <input onChange={(e) => setFileValue(e.target.value)} value={fileValue} type="file" placeholder="" className="inputFile"/>
        <button disabled={titleValue.length  && descriptionValue.length ? '' : 'disabled' } onClick={saveUpdatingTodo}>Добавить Задачу</button>
    </form>
  )
}