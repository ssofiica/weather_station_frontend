import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";
import { RootState } from '../store';


const phenomFilterSlice = createSlice({
  name: 'phenomFilter',
  initialState:{
    name: '',
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    resetName(state) {
      state.name = '';
    },
  },
});

export const { setName } = phenomFilterSlice.actions;
export const useName = () => useSelector((state: RootState) => state.phenomFilter.name)

export default phenomFilterSlice.reducer;