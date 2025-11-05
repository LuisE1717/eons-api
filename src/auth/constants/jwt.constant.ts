export const jwtConstants = {
  accessSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-key',
};