
export const mssqlConfiguration = {
  host: process.env.DB_SQL_HOST || "10.21.2.157",
  user: process.env.DB_SQL_USER || "CRES_GIFTCARD",
  password: process.env.DB_SQL_PASSWORD || "CR3S_G1FTC4RD",
  database: process.env.DB_SQL_DATABASE || "GIFTCARD",
  port: process.env.DB_SQL_PORT || "1433",
};

export const jwtConfig = {
  token_expiration: process.env.JWT_TOKEN_EXPIRATION || "1",
  time: process.env.JWT_TIME || "days",
  secret: process.env.JWT_SECRET || "giftcard-@R",
};

export const apiConfig = {
  name: 'giftcard-niubiz',
  port: process.env.APP_PORT || '3001',
  timedOut: 50,
  errorMessage: "Something wrong. Try again please.",
  origin: process.env.APP_CLIENT_URL || '*',
};