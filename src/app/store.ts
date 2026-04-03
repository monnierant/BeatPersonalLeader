import { configureStore } from '@reduxjs/toolkit';
import { playerApi } from '../features/player/api/playerApi';
import { scoresFilterReducer } from '../features/player/scoresFilterSlice';

export const store = configureStore({
  reducer: {
    [playerApi.reducerPath]: playerApi.reducer,
    scoresFilter: scoresFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
