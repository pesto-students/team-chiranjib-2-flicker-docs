import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_URL,
  GOOGLE_OAUTH_CLIENT_ID,
  STRIPE_SECRET_KEY,
  STRIPE_PRICE_ID_PROFESSIONAL,
  STRIPE_PRICE_ID_ENTERPRISE,
  STARTER_PLAN_LIMIT,
  PROFESSIONAL_PLAN_LIMIT,
  ENTERPRISE_PLAN_LIMIT,
} = process.env;
