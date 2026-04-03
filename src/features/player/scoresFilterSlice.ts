import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PAGE_SIZE } from '../../shared/constants';

interface ScoresFilterState {
  sortBy: string;
  order: string;
  search: string;
  difficulty: string;
  page: number;
  pageSize: number;
}

const initialState: ScoresFilterState = {
  sortBy: 'date',
  order: 'desc',
  search: '',
  difficulty: '',
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

const scoresFilterSlice = createSlice({
  name: 'scoresFilter',
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
      state.page = 1;
    },
    toggleOrder(state) {
      state.order = state.order === 'desc' ? 'asc' : 'desc';
      state.page = 1;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setDifficulty(state, action: PayloadAction<string>) {
      state.difficulty = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSortBy,
  toggleOrder,
  setSearch,
  setDifficulty,
  setPage,
  resetFilters,
} = scoresFilterSlice.actions;

export const scoresFilterReducer = scoresFilterSlice.reducer;
