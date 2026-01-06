export interface EnemyConfig {
  x: number;
  y: number;
  scale?: number;
}

export interface LevelConfig {
  id: number;
  time: number;
  enemies: EnemyConfig[];
}
