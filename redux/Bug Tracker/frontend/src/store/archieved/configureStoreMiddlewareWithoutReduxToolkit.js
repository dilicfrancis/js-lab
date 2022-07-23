import { createStore, applyMiddleware } from "redux";
import reducer from "../reducersIndex";
import logger from "../middleware/logger";

const store = createStore(reducer, applyMiddleware(logger));
