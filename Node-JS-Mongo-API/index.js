import dotenv from "dotenv";
import { httpServer } from "./app.js"
import connectDB from "./db.js"


dotenv.config({
  path: "./.env",
});

const startServer = () => {
  httpServer.listen(5000, () => {
    console.info(
      `📑 Visit the documentation at: http://localhost:${5000
      }`
    );
    console.log("⚙️  Server is running on port: 8004");
  });
};

try {
  startServer(); await connectDB();

} catch (err) {
  console.log("Mongo db connect error: ", err);
}