import { createConnection } from "typeorm-seeding";
import connectionOptions from "../ormconfig";
import { app } from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    console.log(`Server started on port ${PORT}`);
    // await createConnection(connectionOptions);
    const conn = await createConnection(connectionOptions);
    await conn.runMigrations();
    console.log("Migration started");
  } catch (err) {
    console.error(err);
    throw new Error("Unable to connect to db");
  }
});
