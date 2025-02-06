import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Container, Typography } from '@mui/material'
import Order from './Components/Order/index'
function App() {

  return (
    <>
      <Container maxWidth="md">
        <Typography variant='h2' gutterBottom align='center'>
          Restaurant App
        </Typography>
        <Order />
      </Container>
    </>
  )
}

export default App
