import { MongoClient } from "mongodb";
const connectDatabase = async () => {
  const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
  const connection = await client.connect();
  return connection.db(process.env.MONGODB_DB_NAME);
};




const getCollection = async  (name) =>{
  const client = await connectDatabase();
  const collection = await client.collection(name);
  return collection ;
}

export { connectDatabase,getCollection }
