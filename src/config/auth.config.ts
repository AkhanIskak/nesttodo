export default {
  ACCESS_EXPIRE: process.env.ACCESS_EXPIRE || 3600 * 24 * 14,
  REFRESH_EXPIRE: process.env.REFRESH_EXPIRE || 3600 * 24 * 14,
  REFRESH_SECRET: process.env.REFRESH_SECRET || "secret",
  ACCESS_SECRET: process.env.ACCESS_SECRET || "secret",
};
