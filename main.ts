import app from "./app";
import { connect_database } from "./database";
import "reflect-metadata";
const port = process.env.port || 8001;

(async () => {
  await connect_database();
})();

app.listen(port, async (error) => {
  if (error)
    console.log(`Error while starting express server ${error.message}`);
  console.log(`Server started on port ${port}`);
});
