import { createConnection } from "typeorm-seeding";

import connectionOptions from "../ormconfig";
import { app } from "./app";
import { winstonLogger } from "./loggers";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    winstonLogger.info(`Server started on port ${PORT}`);

    await createConnection(connectionOptions);

    winstonLogger.info(`DB connected`);

    process.on(
      "uncaughtException",
      (reason: Error, promise: Promise<unknown>) => {
        winstonLogger.error({
          message: `Unhandled Rejection at: ${promise}, reason: ${reason}`,
        });
      }
    );

    process.on("unhandledRejection", (err: Error) => {
      winstonLogger.error(`${err.name}: ${err.message}`);
    });
  } catch (err) {
    winstonLogger.error(`${err.name}: ${err.message}`);
  }
});
