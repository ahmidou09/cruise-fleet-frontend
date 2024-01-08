import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://cruise-fleet-baknd.onrender.com'
export const login = createAsyncThunk('users/login', async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/sessions`, payload, { withCredentials: true });
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const checkLogin = createAsyncThunk('user/checkLogin', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sessions/logged_in`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const register = createAsyncThunk('user/register', async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/registrations`, (payload), { withCredentials: true });
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const response = axios.delete(`${BASE_URL}/sessions/log_out`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const initialState = {
  user: {},
  loggedIn: false,
  loading: false,
  wrongData: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status === 'created') {
          state.loggedIn = true;
          state.loading = false;
          state.user = (action.payload.user);
          state.loggedIn = (action.payload.logged_in);
          state.wrongData = '';
        } else if (action.payload.status === 401) {
          state.wrongData = 'Wrong password or email';
          state.loading = false;
        }
      })

      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(checkLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(checkLogin.fulfilled, (state, action) => {
        state.loggedIn = action.payload.logged_in;
        state.user = action.payload.user;
        state.loading = false;
      })

      .addCase(checkLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        if (action.payload.status === 'created') {
          state.loggedIn = true;
          state.user = (action.payload.user);
          state.wrongData = '';
          state.loading = false;
        } else if (action.payload.status === 500) {
          const [firstError] = action.payload.errors;
          state.wrongData = firstError;
          state.loading = false;
        }
      })

      .addCase(register.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.loading = false;
      })

      .addCase(logout.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
export const currentUser = (state) => state.user.user;
