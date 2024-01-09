import { createSlice, PayloadAction } from '@reduxjs/toolkit';


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

export default phenomFilterSlice.reducer;