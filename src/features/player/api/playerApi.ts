import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BEATLEADER_API_BASE_URL } from '../../../shared/constants';
import type {
  PlayerProfile,
  ScoresQueryParams,
  ScoresResponse,
} from '../types/player.types';

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: fetchBaseQuery({ baseUrl: BEATLEADER_API_BASE_URL }),
  endpoints: (builder) => ({
    getPlayer: builder.query<PlayerProfile, string>({
      query: (id) => `/player/${encodeURIComponent(id)}`,
    }),
    getPlayerScores: builder.query<ScoresResponse, ScoresQueryParams>({
      query: ({ playerId, page, count, sortBy, order, search, diff }) => {
        const params = new URLSearchParams({
          page: String(page),
          count: String(count),
          sortBy,
          order,
        });
        if (search) {
          params.set('search', search);
        }
        if (diff) {
          params.set('diff', diff);
        }
        return `/player/${encodeURIComponent(playerId)}/scores?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetPlayerQuery, useGetPlayerScoresQuery } = playerApi;
