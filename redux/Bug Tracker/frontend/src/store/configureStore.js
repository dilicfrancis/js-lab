import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducersIndex";
import logger from "./middleware/logger";
import notification from "./middleware/notification";
import api from "./middleware/api";
// import func from "./middleware/func";

export default function () {
  return configureStore({
    reducer,
    // middleware: [logger({ destination: "console" }), func],
    middleware: (defaultMiddleware) =>
      defaultMiddleware().concat(
        logger({
          param:
            "if param was added in your function, you must provided a param here otherwise middleware hangs",
        }),
        notification,
        api
      ),
  });
}
