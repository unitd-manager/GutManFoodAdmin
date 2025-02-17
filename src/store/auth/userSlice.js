import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import loginapi from '../../constants/api'

// userAction.js
export const registerUser = createAsyncThunk(
    // action type string
    'user/registerUser',
    // callback function
    async ({ UserName, email, password }, { rejectWithValue }) => {
    try {
    // configure header's Content-Type as JSON
    const config = {
    headers: {
    'Content-Type': 'application/json',
    },
    }
    // make request to backend
    const response=await loginapi.post(
    '/api/user/register',
    { UserName, email, password },
    config
    )
    return response
    } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
    return rejectWithValue(error.response.data.message)
    } 
    return rejectWithValue(error.message)
    
    }
    })

    // userActions.js
export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (value, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        
        const { data } = await loginapi.post(
          '/api/login',
          value,
          config
        )
        console.log(data);
        // store user's token in local storage
        localStorage.setItem('userToken', data.token)
        window.location.reload()
        return data
    //     const{data}=loginapi
    //   .post('/api/login',value)
    //   .then((res) => {
        
    //     if(res && res.data.status === '400'){
    //       alert('Invalid Username or Password')
    //     }else{
          
    //       localStorage.setItem('userToken',JSON.stringify(res.data.user))
    //         // setToken('123')
    //        window.location.reload()
    //     }
    //   })
    // return data
    } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } 
          return rejectWithValue(error.message)
        
      }
    }
  )

  

 export const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null



// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };
    const initialState = {
        loading: false,
        userInfo: null,
        userToken: null,
        error: null,
        success: false,
      }
      
      const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
          addToken:(state)=>{
            state.userToken = localStorage.getItem('userToken')
        },
        logout:(state)=>{
            state.userToken = null
            localStorage.removeItem('userToken')
            window.location.reload()
        }
        },
        extraReducers: {
          // register user
          [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
          },
          [registerUser.fulfilled]: (state) => {
            state.loading = false
            state.success = true // registration successful
          },
          [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
          },
          [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
          },
          [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.token
          },
          [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
          }
        },
      })

     

      export const {addToken,logout}  = userSlice.actions;
      export default userSlice.reducer