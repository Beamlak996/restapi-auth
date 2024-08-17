import express from "express";
import { validateResource } from "../middleware/validate-resource";
import { createUserHandler } from "../controller/user.controller";
import { createUserSchema } from "../schema/user.schema";

export default (router: express.Router) => {
  // This is a test api
  router.get("/api/test", (req, res) => {
    res.status(200).json({ message: "Api test successful" });
  });

  router.post("/api/users", validateResource(createUserSchema), createUserHandler);
};
