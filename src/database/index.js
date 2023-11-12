import mongoose from "mongoose";

const dbConnection = async () => {
  const connectionUrl = process.env.DATABASE_URL;

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Connected to database!"))
    .catch((err) =>
      console.log(`Getting error from db connection: ${err.message}`)
    );
};

export default dbConnection;
