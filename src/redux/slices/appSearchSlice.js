import { createSlice } from '@reduxjs/toolkit';

const appSearchSlice = createSlice({
  name: 'appSearch',
  initialState: {
    searchValue: '',
  },
  reducers: {
    updateSearch: (state, action) => {
      state.searchValue = action?.payload?.searchValue || '';
    },
  },
});

export const { updateSearch } = appSearchSlice.actions;
export default appSearchSlice.reducer;
