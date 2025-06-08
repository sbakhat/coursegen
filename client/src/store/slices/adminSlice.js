import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdmin: false,
  adminEmail: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      const { email, password } = action.payload;
      if (email === 'admin@gmail.com' && password === '123456778') {
        state.isAdmin = true;
        state.adminEmail = email;
        state.error = null;
      } else {
        state.error = 'Invalid admin credentials';
      }
    },
    adminLogout: (state) => {
      state.isAdmin = false;
      state.adminEmail = null;
      state.error = null;
    },
    clearAdminError: (state) => {
      state.error = null;
    },
  },
});

export const { adminLogin, adminLogout, clearAdminError } = adminSlice.actions;
export default adminSlice.reducer; 