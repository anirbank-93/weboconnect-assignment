"use client";

import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  styled,
  Input
} from "@mui/material";
import { useState, useEffect } from "react";

// Api function

//   // Redux action
//   import { createPost } from '../../redux/actions/postAction';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  "& > *": {
    margin: theme.spacing(1),
  },
}));

const FileInputWrapper = styled(Box)`
  width: 97%;
  margin: 10px 0;
`;

const SubmitButton = styled(Button)`
  margin-bottom: 10px;
`;

const postInitialValues = {
  creator: "",
  title: "",
  description: "",
  tags: "",
  file: "",
  likes: 0,
};

const Form: React.FC = () => {
  const [postData, setPostData] = useState(postInitialValues);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    //   let res = await JSON_API['createPost'](postData);
    //   console.log('response', res);

    //   if (res?.isSuccess) {
    //     console.log('sucesss');
    //     // clear();
    //   }

    //   // dispatch(createPost(postData));
  };

  const clear = () => {
    console.log("Cleared");
  };

  return (
    <StyledPaper>
      <StyledForm
        autoComplete="off"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
      >
        <Typography variant="h6">Creating A Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <FileInputWrapper>
          <Input
            type="file"
          />
        </FileInputWrapper>
        <SubmitButton
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </SubmitButton>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </StyledForm>
    </StyledPaper>
  );
};

export default Form;
