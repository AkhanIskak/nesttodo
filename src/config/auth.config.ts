export default {
  ACCESS_EXPIRE: process.env.ACCESS_EXPIRE || 3600 * 24 * 14,
  ACCESS_SECRET: process.env.ACCESS_SECRET || "secret",
};
