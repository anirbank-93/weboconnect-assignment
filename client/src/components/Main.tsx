"use client"

import React, { useState } from 'react'

// Components
import {
  Container,
  Grow,
} from '@mui/material';
import Grid from "@mui/material/Grid";

// Pages
import Posts from "@/app/posts/page";
import Form from "@/app/form/page";

const Main: React.FC = () => {
  const [currentId, setcurrentId] = useState<number | undefined>(undefined);

  return (
    <Container maxWidth="lg">
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