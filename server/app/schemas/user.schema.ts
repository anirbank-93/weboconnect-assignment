import { object, ref, string } from "yup";

export const createUserSchema = object({
  body: object({
    firstName: string().required("Name is required"),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters"),
    passwordConfirmation: string().oneOf(
      [ref("password"), undefined],
      "Passwords don't match"
    ),
  }),
});

export const getUserSchema = object({
  params: object({
    id: string().required("User id is required."),
  }),
})

export const createUserSessionSchema = object({
  body: object({
    email: string().required("Email is required"),
    password: string().required("Password is required"),
  }),
});
