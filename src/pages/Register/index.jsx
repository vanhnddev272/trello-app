import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { registerAPI } from '~/apis'
import { joiResolver } from '@hookform/resolvers/joi'
import { schema } from './validation'

export default function Register() {
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: joiResolver(schema) })
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const registerUser = await registerAPI(data)
    console.log(registerUser)
    navigate('/login')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              required: 'Username is required',
              minLength: {
                value: 6,
                message: 'Username must be at least 6 characters'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button sx={{ marginTop: '8px' }} type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
        <Grid sx={{ marginTop: '8px' }} container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
