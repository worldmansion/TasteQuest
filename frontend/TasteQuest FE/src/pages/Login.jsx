import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material'
import { useData } from '../store/appStore'
import { useUserApi } from '../hooks/useUserApi'
import { useEffect } from 'react'
import { UserForm } from '../components/UserForm'

export const Login = () => {
  const { data, setData } = useData()
  const { getAllUsers } = useUserApi()
  const { users } = data

  const setUsers = (users) => {
    setData({ ...data, users })
  }

  const handleChange = (event) => {
    const newState = { ...data }
    newState.user = event.target.value
    setData(newState)
  }

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users || []))
  }, [])

  return (
    <Container maxWidth="sm">
      <Paper width="sm">
        <FormControl fullWidth>
          <InputLabel id="choose-a-user">Choose a user</InputLabel>
          <Select
            labelId="choose-a-user"
            id="choose-a-user-select"
            value={data.user}
            label="Choose a user"
            onChange={handleChange}
          >
            {Array.isArray(users) &&
              users.map((user) => (
                <MenuItem key={user.id} value={user}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <UserForm />
      </Paper>
    </Container>
  )
}
