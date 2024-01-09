import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";

const draftSlice = createSlice({
    name: 'draft',
    initialState:{
        phenoms: [],
        draft_id: 0,
    },
    reducers: {
      setPhenoms(state, {payload}) {  // изменяем состояние на полученные данные
        state.phenoms = payload.phenoms
      },
      resetDraft(state) {  // обнуляем 
        state.phenoms = []
        state.draft_id = 0
      }
    }
});

export const {setPhenoms, resetDraft} = draftSlice.actions
export default draftSlice.reducer