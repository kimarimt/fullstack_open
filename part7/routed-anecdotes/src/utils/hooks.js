import { useState } from 'react'

export const useField = (title, type = 'text') => {
  const id = title
  const name = title
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    id,
    name,
    type,
    value,
    onChange,
    reset
  }
}