export default {
  type: process.env.DB_TYPE || "mongodb",
  url: `mongodb+srv://akhan:ahan2004@akhan.gpwjoqy.mongodb.net/?retryWrites=true&w=majority`,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
};
