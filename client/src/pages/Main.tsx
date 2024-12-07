"use client"

import React, { useState } from 'react'
import {
  Container,
  AppBar,
  Typography,
  Grow,
  styled,
} from '@mui/material';
import Grid from "@mui/material/Grid";

// Assets
import memories from "@/assets/images/memories.png"

// Components
// import Header from "@/components/Header";
import { StyledAppBar, Heading, StyledImage } from "@/components/AppStyles";

// Pages
import Posts from "@/app/posts/page";
import Form from "@/app/form/page";

const Main: React.FC = () => {
  const [currentId, setcurrentId] = useState<number | undefined>(undefined);

  return (
    <Container maxWidth="lg">
      <StyledAppBar position="static" color="inherit">
        <Heading variant="h2" align="center">
          Memories
        </Heading>
        <StyledImage src={memories} alt="memories" height="60" />
      </StyledAppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch">
            <Grid item xs={12} sm={7}>
              <Posts setcurrentId={setcurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default Main