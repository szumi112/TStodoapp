import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { RiEditBoxLine } from 'react-icons/ri'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import './styles.css'
import TodoList from './TodoList'
import useLocalStorage from '../CustomHook/useLocalStorage.js'

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useLocalStorage('edit', false)
  const [editTodo, setEditTodo] = useLocalStorage('editTodo', todo.todo)
  const handleDone = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    )
    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <form className='todos_single' onSubmit={e => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={e => setEditTodo(e.target.value)}
          className='todos_single-text'
        />
      ) : todo.isDone ? (
        <s className='todos_single-text'>{todo.todo}</s>
      ) : (
        <span className='todos_single-text'>{todo.todo}</span>
      )}

      <div>
        <span
          className='icon'
          onClick={() => {
            if (!edit) {
              setEdit(!edit)
            }
          }}
        >
          <RiEditBoxLine />
        </span>
        <span className='icon' onClick={() => handleDelete(todo.id)}>
          <RiDeleteBin6Line />
        </span>
        <span className='icon' onClick={() => handleDone(todo.id)}>
          <BsFillCheckCircleFill />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo
