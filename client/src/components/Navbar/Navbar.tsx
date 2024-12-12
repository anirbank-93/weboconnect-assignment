"use client";

import React from "react";

// Assets
import memories from "@/assets/images/memories.png";

// Components
import {
  styled,
  Container,
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { deepPurple } from "@mui/material/colors";

import "./styles.css";

export const StyledAppBar = styled(AppBar)`
  border-radius: 15px;
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Heading = styled(Typography)`
  color: rgba(0, 183, 255, 1);
`;

export const StyledImage = styled(Image)({
  marginLeft: 15,
});

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "400px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

export const ProfileDivStyled = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "400px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    marginTop: 20,
    justifyContent: "center",
  },
}));

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
}));

export const UsernameArea = styled(Typography)`
  display: flex;
  align-items: center;
  text-align: center;
`;

export const LogoutBtn = styled(Button)`
  margin-left: 20px;
`;

const Navbar = () => {
  const user = {
    result: {
      name: "",
      imageUrl: "",
    },
  };

  return (
    <Container maxWidth="lg">
      <StyledAppBar position="static" color="inherit">
        <div className="brandContainer">
          <Heading variant="h2" align="center">
            Memories
          </Heading>
          <StyledImage src={memories} alt="memories" height="60" />
        </div>
        <ToolbarStyled>
          {user ? (
            <ProfileDivStyled>
              <AvatarStyled alt={user.result.name} src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </AvatarStyled>
              <UsernameArea variant="h6">{user.result.name}</UsernameArea>
              <LogoutBtn
                variant="contained"
                color="secondary"
                onClick={() => {}}
              >
                Logout
              </LogoutBtn>
            </ProfileDivStyled>
          ) : (
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          )}
        </ToolbarStyled>
      </StyledAppBar>
    </Container>
  );
};

export default Navbar;
