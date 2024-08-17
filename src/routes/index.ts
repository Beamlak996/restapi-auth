import express from "express";
import users from "./user.route";

const router = express.Router();

export default (): express.Router => {
  users(router);

  return router;
};
