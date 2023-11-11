import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbConnection = async () => {
  const connectionUrl = process.env.DATABASE_URL;

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Connected to database!"))
    .catch((err) =>
      console.log(`Getting error from db connection: ${err.message}`)
    );
};

export default dbConnection;
