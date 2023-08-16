import { MongoClient } from "mongodb";

const connectionString = 'mongodb+srv://enigmaticiconoclast:Shreditup1198@tictactoe.h4fy4zj.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(connectionString);
console.log(connectionString);

let conn;
try {
    console.log(connectionString);
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("connect_mongodb_users");

export default db;