import express from "express";
import { createSessionSchema } from "../schema/session.schema";
import { validateResource } from "../middleware/validate-resource";
import { createUserSessionHandler } from "../controller/session.controller";


export default (router: express.Router) => {
    router.post(
      "/api/sessions",
      validateResource(createSessionSchema),
      createUserSessionHandler
    );
}