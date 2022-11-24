import React, {useState} from "react";
import styles from './AddTodo.module.scss'


export const AddTodo = ({todos, setTodos}) => {
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [fileValue, setFileValue] = useState('')

  const saveTodo = () => {
    setTodos(
      [...todos, {
        id: new Date(),
        title: titleValue,
        description: descriptionValue,
        date: dateValue,
        file: fileValue,
        done: false,
        overdue: false,
      }]
    )
    setTitleValue('')
    setDescriptionValue('')
    setDateValue('')
    setFileValue('')
  }

  return (
    <>
      <div className={styles.controlGroup}>
        <div className={styles.control}>
          <input className={styles.inputTitle} onChange={(e) => setTitleValue(e.target.value)} value={titleValue} type="text" placeholder="Заголовок"/>
          <input className={styles.inputDescription} onChange={(e) => setDescriptionValue(e.target.value)} value={descriptionValue} type="text" placeholder="Описание"/>
        </div>

        <div className={styles.control}>
          <input className={styles.inputDate} onChange={(e) => setDateValue(e.target.value)} value={dateValue} type="date" />
          <input className={styles.inputFile} onChange={(e) => setFileValue(e.target.value)} value={fileValue} type="file" />
        </div>

        <div className={styles.control}>
          <button onClick={saveTodo} className={styles.btnAdd}>Добавить Задачу</button>
        </div>
      </div>
    </>
  )
}