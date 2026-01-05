export interface EnemyConfig {
  x: number;
  y: number;
}

export interface LevelConfig {
  id: number;
  time: number;
  enemies: EnemyConfig[];
}
