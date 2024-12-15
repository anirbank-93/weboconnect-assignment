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

import "./styles.css";

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
    const { firstName } = signUpValues;

    if (firstName === "") {
      setsignUpErrors({
        ...userCreateErrors,
        firstName: "First name is required",
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
          <Grid container spacing={2}>
            {!isSignUp && (
              <>
                <TextField
                  label="First Name"
                  name="firstName"
                  id="firstName"
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
                ></TextField>
                <span className="errors">*</span>
                <span className="errors">{signUpErrors.firstName}</span>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignUp}
                >
                  Submit
                </Button>
              </>
            )}
          </Grid>
        </FormStyled>
      </PaperStyled>
    </Container>
  );
};

export default page;
