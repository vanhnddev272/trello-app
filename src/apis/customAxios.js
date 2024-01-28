// import axios from 'axios'
// import { jwtDecode } from 'jwt-decode'
// import { requestRefreshTokenAPI } from '.'
// import { useDispatch, useSelector } from 'react-redux'
// import { refreshToken } from '~/redux/slices/userSlice'

// const user = localStorage.getItem('loggedUser')

// const verifyJwtTokenAxios = axios.create()
// verifyJwtTokenAxios.interceptors.request.use(
//   async (config) => {
//     const accessToken = localStorage.getItem('access_token')
//     const decodedToken = jwtDecode(accessToken)
//     if (decodedToken.exp < new Date().getTime()/1000) {
//       const data = await requestRefreshTokenAPI(user)
//       const refreshedUser = {
//         ...user,
//         accessToken: data.accessToken
//       }
//       dispatch(refreshToken(refreshedUser))
//       config.headers['token'] = 'Bearer ' + data.accessToken
//     }
//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   }
// )
// export const CreateCustomAxios = () => {
//   return verifyJwtTokenAxios
// }
