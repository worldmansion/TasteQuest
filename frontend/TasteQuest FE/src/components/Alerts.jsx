import { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useData } from '../store/appStore'

export function Alerts() {
  const { data, setData } = useData()
  const { alerts } = data
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (Object.keys(alerts).length > 0) {
      const firstKey = Object.keys(alerts)[0]
      setMessage(alerts[firstKey])
      setOpen(true)
    }
  }, [alerts])

  const handleClose = () => {
    setOpen(false)
    setData({...data, alerts:{} })
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      variant="filled"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{ margin: '30px' }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
