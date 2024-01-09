import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";
import { RootState } from '../store';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    is_auth: false,
    is_admin: false,
    email: '',
  },
  reducers: {
    loginUser: (state, action) => {
      state.is_auth = true;
      state.is_admin = action.payload.is_admin;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.is_auth = false;
      state.is_admin = false;
    },
  },
});

export const useIsAuth = () =>
  useSelector((state: RootState) => state.auth.is_auth)

export const useIsAdmin = () =>
  useSelector((state: RootState) => state.auth.is_admin)

export const useEmail = () =>
  useSelector((state: RootState) => state.auth.email)

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;