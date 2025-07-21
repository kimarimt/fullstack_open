import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

export const useField = (id, type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    id,
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountryData = async () => {
      const res = await axios.get(`${baseUrl}/${name}`)
      setCountry(res.data)
    }

    if (name) {  
      getCountryData()
    }
  }, [name])

  return country
}
