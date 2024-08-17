import express from "express";
import { createUserHandler } from "../controller/user.controller";

export default (router: express.Router) => {
  router.get("/api/test", (req, res) => {
    res.status(200).json({ message: "Api test successful" });
  });
  router.post("/api/user", createUserHandler);
};
