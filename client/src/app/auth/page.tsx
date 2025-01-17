"use client";

import React, { useState, useRef } from "react";

// API
import { ApiHelperFunction } from "../../helpers/api_helpers";

// Models
import { ApiFuncArgProps } from "../../models/apiFuncHelpers";

// Utils
import { toast } from "react-hot-toast";

// Helpers
import { isApiErrorResponse } from "../../helpers/typeguards";

// Components
import {
  styled,
  Container,
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import TextInput from "@/components/common/TextInput";

export const PaperStyled = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

export const FormStyled = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(3),
}));

export const SignUpSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

let signUpInitVal = {
  firstName: "",
  lastName: "",
  email: "",
  profile_pic: "",
  password: "",
  passwordConfirmation: "",
};

let userCreateErrors = {
  firstName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

let signInInitVal = {
  email: "",
  password: "",
};

let authErrors = {
  email: "",
  password: "",
};

var emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const page = () => {
  const [isSignUp, setisSignUp] = useState(false);
  const [signUpValues, setsignUpValues] = useState(signUpInitVal);
  const [profilePicFile, setprofilePicFile] = useState<File | undefined>(
    undefined
  );
  const profilePicRef = useRef<HTMLInputElement>(null);
  const [uploadedProfilePic, setuploadedProfilePic] = useState("");
  const [signUpErrors, setsignUpErrors] = useState(userCreateErrors);
  const [signInValues, setsignInValues] = useState(signInInitVal);
  const [signInErrors, setsignInErrors] = useState(authErrors);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setsignUpValues({
      ...signUpValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidation = () => {
    const { firstName, email, password, passwordConfirmation } = signUpValues;

    if (firstName === "") {
      setsignUpErrors({
        ...userCreateErrors,
        firstName: "First name is required",
      });
      return false;
    }

    if (email === "") {
      setsignUpErrors({
        ...userCreateErrors,
        email: "Email is required",
      });
      return false;
    }

    if (!emailReg.test(email)) {
      setsignUpErrors({ ...userCreateErrors, email: "Invalid email" });
      return false;
    }

    if (password === "") {
      setsignUpErrors({
        ...userCreateErrors,
        password: "Password cannot be empty.",
      });
      return false;
    }
    if (password.length < 8) {
      setsignUpErrors({
        ...userCreateErrors,
        password: "Password cannot be less than 8 characters.",
      });
      return false;
    }
    if (passwordConfirmation === "") {
      setsignUpErrors({
        ...userCreateErrors,
        passwordConfirmation: "Confirm password cannot be empty.",
      });
      return false;
    }
    if (passwordConfirmation !== password) {
      setsignUpErrors({
        ...userCreateErrors,
        passwordConfirmation: "Password and confirm password is not same.",
      });
      return false;
    }

    return true;
  };

  const handleSignUp: React.MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      console.log("signUpValues", signUpValues);
      try {
        const res = await ApiHelperFunction({
          urlPath: "/user",
          method: "POST",
          data: signUpValues,
        } as ApiFuncArgProps);

        if (isApiErrorResponse(res)) {
          toast.error(res.error.message);
        } else if (res.data) {
          //
        } else {
          console.log("Unexpected response:", res);
        }
      } catch (error:any) {
        toast.error(error.message);
      }
    }
  };

  const handleAuthValuesChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setsignInValues({
      ...signInValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleAuthValueValidation = () => {
    const { email, password } = signInValues;

    if (email === "") {
      setsignInErrors({
        ...authErrors,
        email: "Email is required",
      });
      return false;
    }

    if (password === "") {
      setsignInErrors({
        ...authErrors,
        password: "Password cannot be empty.",
      });
      return false;
    }

    return true;
  };

  const handleSignIn: React.MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = async (event) => {
    event.preventDefault();

    if (handleAuthValueValidation()) {
      console.log(signInValues);
    }
  };

  return (
    <Container maxWidth="lg">
      <PaperStyled elevation={3}>
        <AvatarStyled>
          <LockOutlined />
        </AvatarStyled>

        <Typography variant="h5">
          {!isSignUp ? "Sign Up" : "Sign In"}
        </Typography>

        <FormStyled action="">
          {!isSignUp ? (
            <>
              <Grid container spacing={2}>
                <TextInput
                  mandatory={true}
                  autoFocus
                  halfScreen
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                  value={signUpValues.firstName}
                  onChange={(e) => {
                    handleChange(e);

                    if (e.target.value.length > 0) {
                      setsignUpErrors((prev) => {
                        prev.firstName = "";
                        return prev;
                      });
                    }
                  }}
                  error={signUpErrors.firstName}
                />
                <TextInput
                  halfScreen
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={signUpValues.lastName}
                  onChange={handleChange}
                />
                <TextInput
                  mandatory={true}
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email for example, johndoe@google.com"
                  value={signUpValues.email}
                  onChange={(e) => {
                    handleChange(e);

                    if (e.target.value.length > 0) {
                      setsignUpErrors((prev) => {
                        prev.email = "";
                        return prev;
                      });
                    }
                  }}
                  error={signUpErrors.email}
                />
                <TextInput
                  mandatory={true}
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={signUpValues.password}
                  onChange={(e) => {
                    handleChange(e);

                    if (e.target.value.length > 0) {
                      setsignUpErrors((prev) => {
                        prev.password = "";
                        return prev;
                      });
                    }
                  }}
                  error={signUpErrors.password}
                />
                <TextInput
                  mandatory={true}
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={signUpValues.passwordConfirmation}
                  onChange={(e) => {
                    handleChange(e);

                    if (e.target.value.length > 0) {
                      setsignUpErrors((prev) => {
                        prev.passwordConfirmation = "";
                        return prev;
                      });
                    }
                  }}
                  error={signUpErrors.passwordConfirmation}
                />
              </Grid>
              <SignUpSubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSignUp}
              >
                Submit
              </SignUpSubmitButton>
            </>
          ) : (
            <>
              <Grid container spacing={2}>
                <TextInput
                  mandatory={true}
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email for example, johndoe@google.com"
                  value={signInValues.email}
                  onChange={(e) => {
                    handleAuthValuesChange(e);

                    if (e.target.value.length > 0) {
                      setsignInErrors((prev) => {
                        prev.email = "";
                        return prev;
                      });
                    }
                  }}
                  error={signInErrors.email}
                />
                <TextInput
                  mandatory={true}
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={signInValues.password}
                  onChange={(e) => {
                    handleAuthValuesChange(e);

                    if (e.target.value.length > 0) {
                      setsignInErrors((prev) => {
                        prev.password = "";
                        return prev;
                      });
                    }
                  }}
                  error={signInErrors.password}
                />
              </Grid>
              <SignUpSubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSignIn}
              >
                Submit
              </SignUpSubmitButton>
            </>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={() => setisSignUp((prev) => !prev)}>
                {!isSignUp
                  ? `Already have an account? Sign in.`
                  : `Don't have an account? Sign up.`}
              </Button>
            </Grid>
          </Grid>
        </FormStyled>
      </PaperStyled>
    </Container>
  );
};

export default page;
