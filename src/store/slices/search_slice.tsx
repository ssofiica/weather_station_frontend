import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  status: string;
  startDate: string;
  endDate: string;
  user: string;
}

const initialState: FilterState = {
  status: '',
  startDate: '',
  endDate: '',
  user: '',
};

const requestFilterSlice = createSlice({
  name: 'requestFilter',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setStartDate(state, action) {
      state.startDate= action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    resetFilters(state) {
      state.status = '';
      state.startDate = '';
      state.endDate = '';
      state.user = '';
    },
  },
});

export const { setStatus, setStartDate, setEndDate, setUser, resetFilters } = requestFilterSlice.actions;

export default requestFilterSlice.reducer;