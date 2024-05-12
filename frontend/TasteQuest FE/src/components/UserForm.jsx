import { Paper, TextField, Box, Button } from '@mui/material'
import { useUserApi } from '../hooks/useUserApi'
import { useState } from 'react'
import { useData } from '../store/appStore'

export function UserForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const { data, setData } = useData()

  const setUsers = (users) => {
    setData({...data, users})
  }

  const { createUser, getAllUsers } = useUserApi()

  const handleCreateUser = async () => {
    await createUser({ name, email })
    getAllUsers().then((users) => setUsers(users || []))
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
        />
        <Button
          style={{ marginTop: 10 }}
          onClick={handleCreateUser}
          variant={'outlined'}
        >
          Create User
        </Button>
      </Paper>
    </Box>
  )
}
