import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BEATLEADER_API_BASE_URL, CORS_PROXY_URL } from '../../../shared/constants';
import type {
  PlayerProfile,
  ScoresQueryParams,
  ScoresResponse,
} from '../types/player.types';

const getRequestUrl = (input: RequestInfo | URL): string => {
  if (typeof input === 'string') {
    return input;
  }
  if (input instanceof Request) {
    return input.url;
  }
  return String(input);
};

const proxiedFetch: typeof fetch = (input, init) => {
  if (import.meta.env.DEV) {
    return fetch(input, init);
  }
  const url = getRequestUrl(input);
  return fetch(`${CORS_PROXY_URL}${encodeURIComponent(url)}`, init);
};

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: fetchBaseQuery({ baseUrl: BEATLEADER_API_BASE_URL, fetchFn: proxiedFetch }),
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
