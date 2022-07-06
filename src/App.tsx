import { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { Todo } from './model'
import useLocalStorage from './CustomHook/useLocalStorage'

const App: React.FC = () => {
  const [todo, setTodo] = useLocalStorage('todo', '')
  const [todos, setTodos] = useLocalStorage('todos', [])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo('')
    }
  }

  console.log(todos)
  return (
    <div className='App'>
      <span className='heading'>
        To Do <span className='smallHeadingSpan'>&</span> Notes 📝{' '}
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App
