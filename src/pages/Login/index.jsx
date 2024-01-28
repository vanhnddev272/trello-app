import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Controller, useForm } from 'react-hook-form'
import { loginAPI } from '~/apis'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { useDispatch } from 'react-redux'
import { loginUser } from '~/redux/slices/userSlice'

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const userLogin = await loginAPI(data)
    if (userLogin) {
      dispatch(loginUser(userLogin.user))
      localStorage.setItem('access_token', userLogin.user.accessToken)
      navigate('/')
    }
  }
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" marginY={2}>Sign in</Typography>
      <form id='login' onSubmit={handleSubmit(onSubmit)}>
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
              autoFocus
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign in
        </Button>
      </form>
      <Grid sx={{ marginTop: '8px' }} container justifyContent="flex-end">
        <Grid item>
          <Link href="/register" variant="body2">
            Need an Account?? Sign up
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
