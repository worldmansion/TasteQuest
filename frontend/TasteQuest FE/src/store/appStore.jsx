import { createContext, useContext, useState } from 'react'

const initialState = {
  user: undefined,
  recipeDetail: undefined,
  search: '',
  recipes: [],
  favourites: [],
  alerts: {},
  users: []
}
const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialState)
  console.log('data:', data)
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}

const useData = () => useContext(DataContext)

export { DataProvider, useData }
