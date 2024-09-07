import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required.",
    }),
    email: string({
      required_error: "Email is required.",
    }).email("Not a valid email."),
    password: string({
      required_error: "Password is required.",
    }).min(6, "Passvword is too short, should be a minimum of 6 characters."),
    passwordConfirmation: string({
      required_error: "Password confirmation is required.",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});


export type CreateUserInput = TypeOf<typeof createUserSchema>