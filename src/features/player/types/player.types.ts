export interface PlayerProfile {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
  readonly country: string;
  readonly rank: number;
  readonly countryRank: number;
  readonly pp: number;
  readonly level: number;
  readonly experience: number;
  readonly scoreStats: PlayerScoreStats;
}

export interface PlayerScoreStats {
  readonly totalScore: number;
  readonly totalUnrankedScore: number;
  readonly totalRankedScore: number;
  readonly totalPlayCount: number;
  readonly rankedPlayCount: number;
  readonly unrankedPlayCount: number;
  readonly averageAccuracy: number;
  readonly averageRankedAccuracy: number;
  readonly averageUnrankedAccuracy: number;
  readonly topAccuracy: number;
  readonly topUnrankedAccuracy: number;
  readonly maxStreak: number;
  readonly scorePlaytime: number;
}

export interface PlayerScore {
  readonly id: number;
  readonly accuracy: number;
  readonly baseScore: number;
  readonly modifiedScore: number;
  readonly rank: number;
  readonly fullCombo: boolean;
  readonly modifiers: string;
  readonly missedNotes: number;
  readonly badCuts: number;
  readonly timeset: string;
  readonly pp: number;
  readonly accLeft: number;
  readonly accRight: number;
  readonly fcAccuracy: number;
  readonly maxCombo: number;
  readonly maxStreak: number;
  readonly pauses: number;
  readonly bombCuts: number;
  readonly wallsHit: number;
  readonly leaderboard: ScoreLeaderboard;
}

export interface LeaderboardScoreGraphEntry {
  readonly playerId: string;
  readonly accuracy: number;
  readonly rank: number;
  readonly weight: number;
  readonly pp: number;
  readonly mistakes: number;
  readonly modifiers: string;
  readonly playerName: string;
}

export interface ScoreLeaderboard {
  readonly id: string;
  readonly song: LeaderboardSong;
  readonly difficulty: LeaderboardDifficulty;
}

export interface LeaderboardSong {
  readonly id: string;
  readonly hash: string;
  readonly name: string;
  readonly subName: string;
  readonly author: string;
  readonly mapper: string;
  readonly coverImage: string;
  readonly bpm: number;
  readonly duration: number;
}

export interface LeaderboardDifficulty {
  readonly id: number;
  readonly value: number;
  readonly mode: number;
  readonly difficultyName: string;
  readonly modeName: string;
  readonly stars: number | null;
  readonly status: number;
  readonly notes: number;
}

export interface ScoresResponse {
  readonly metadata: PaginationMetadata;
  readonly data: readonly PlayerScore[];
}

export interface PaginationMetadata {
  readonly itemsPerPage: number;
  readonly page: number;
  readonly total: number;
}

export interface ScoresQueryParams {
  readonly playerId: string;
  readonly page: number;
  readonly count: number;
  readonly sortBy: string;
  readonly order: string;
  readonly search?: string;
  readonly diff?: string;
}
