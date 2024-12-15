"use client";

import React, { useState, useRef } from "react";

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

var emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const page = () => {
  const [signUpValues, setsignUpValues] = useState(signUpInitVal);
  const [profilePicFile, setprofilePicFile] = useState<File | undefined>(
    undefined
  );
  const profilePicRef = useRef<HTMLInputElement>(null);
  const [uploadedProfilePic, setuploadedProfilePic] = useState("");
  const [signUpErrors, setsignUpErrors] = useState(userCreateErrors);

  const isSignUp = false;

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
          {!isSignUp && (
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
          )}
        </FormStyled>
      </PaperStyled>
    </Container>
  );
};

export default page;
