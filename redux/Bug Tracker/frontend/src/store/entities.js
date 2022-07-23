import { combineReducers } from "redux";
import bugs from "./bugs";
import projects from "./projects";
import users from "./users";

export default combineReducers({ bugs, projects, users });
