import React, { useRef } from 'react'
import './styles.css'

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form
      className='input'
      onSubmit={e => {
        handleAdd(e)
        inputRef.current?.blur()
      }}
    >
      <input
        ref={inputRef}
        value={todo || ''}
        onChange={e => setTodo(e.target.value)}
        className='input_box'
        type='input'
        placeholder='Enter a task'
      />
      <button className='input_submit' type='submit'>
        {' '}
        Add
      </button>
    </form>
  )
}

export default InputField
