import express from "express";
import users from "./user.route";
import sessions from "./session.route"

const router = express.Router();

export default (): express.Router => {
  users(router);
  sessions(router)


  return router;
};
