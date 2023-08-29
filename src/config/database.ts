import * as process from "process";
export default {
  type:process.env.DB_TYPE|| 'mongodb',
  host: process.env.DB_HOST || 'localhost',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  port: parseInt(process.env.DB_PORT) || 27017,
  database: process.env.DB_NAME || 'sobes',
};
