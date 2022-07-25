import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register New User
export const register = createAsyncThunk('auth/register',
  async(user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (e) {
      const message =
        (e.response &&
          e.response.data &&
          e.response.data.message) ||
        e.message ||
        e.toString()

        return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login User
export const login = createAsyncThunk('auth/login',
  async(user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (e) {
      const message =
        (e.response &&
          e.response.data &&
          e.response.data.message) ||
        e.message ||
        e.toString()

        return thunkAPI.rejectWithValue(message)
    }
  }
)

// Logout User
export const logout = createAsyncThunk('auth/logout',
  async () => {
    return await authService.logout()
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions

export default authSlice.reducer