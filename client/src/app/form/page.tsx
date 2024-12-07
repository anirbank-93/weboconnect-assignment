"use client";

import React, { useState, useRef } from "react";

// Utils
import { toast } from "react-hot-toast";

// Models
import { ApiFuncArgProps } from "@/models/apiFuncHelpers";

// Typeguards
import { isApiErrorResponse } from "@/helpers/typeguards";

// Api function
import { ApiHelperFunction } from "@/helpers/api_helpers";

// Components
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  styled,
} from "@mui/material";

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

interface PostAttrs {
  creator: string;
  title: string;
  description: string;
  tags: string;
  selectedFile: string;
  likes: number;
}

const postInitialValues = {
  creator: "",
  title: "",
  description: "",
  tags: "",
  selectedFile: "",
  likes: 0,
};

let createError = {
  title: "",
  selectedFile: "",
};

const Form: React.FC = () => {
  const [postData, setPostData] = useState<PostAttrs>(postInitialValues);
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setfiles] = useState<File | undefined>(undefined);
  const [errors, seterrors] = useState(createError);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (event) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const handleSubmitFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!event.target.files) return;

    if (event.target.files.length === 0) return;

    let files = event.target.files[0];

    // let imgArr = [...attachmentFiles];

    // for (let i: number = 0; i < files.length; i++) {
    //   if (files.size > 500000000) {
    //     seterrors({
    //       ...errors,
    //       selectedFile: "Uploaded file can't be more than 5mb",
    //     });
    //   } else {
    //     if (!attachmentFiles.find((item) => item.name === files[i].name)) {
    //       imgArr.push(files[i]);
    //     }
    //   }
    // }

    // setattachmentFiles(imgArr);
    // setsubmitDataErrors({ ...submitAssignmentCreateErrors, attachment: "" });
    if (files.size > 500000000) {
      seterrors({
        ...errors,
        selectedFile: "Uploaded file can't be more than 5mb",
      });
    } else {
      setfiles(files);
      seterrors({ ...errors, selectedFile: "" });
    }
  };

  /** -------- Validation of input ---------- */
  const handleValidation = () => {
    const { title } = postData;

    if (title === "") {
      seterrors({ ...createError, title: "" });
      return false;
    }
    return true;
  };
  /** --------------------------------------- */

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    // if (handleValidation()) {
    try {
      const DATA = new FormData();

      // for (let i: number = 0; i < attachmentFiles.length; i++) {
      //   DATA.append("files", attachmentFiles[i]);
      // }
      if (files) {
        DATA.append("image", files);
      }

      const imgUpRes = await ApiHelperFunction({
        urlPath: "/upload-image",
        method: "POST",
        data: DATA,
        role: "privileged",
        contentType: "form-data",
      } as ApiFuncArgProps);

      if (isApiErrorResponse(imgUpRes)) {
        toast.error(imgUpRes.error.message);
      } else if (imgUpRes.data) {
        let bodyData = {
          ...postData,
          selectedFile: imgUpRes.data.imageUrl,
        };
        
        let response = await ApiHelperFunction({
          urlPath: "/posts",
          method: "POST",
          data: {
            data: bodyData,
          },
          role: "privileged",
        } as ApiFuncArgProps);

        if (isApiErrorResponse(response)) {
          toast.error(response.error.message);
        } else if (response.data) {
          setPostData(postInitialValues);
          setfiles(undefined);
          if (fileRef.current) {
            fileRef.current.value = "";
          }
          seterrors(errors);
          toast.success("Submitted successfully.");
        } else {
          console.log("Unexpected response:", response);
        }
      } else {
        console.log("Unexpected response:", imgUpRes);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    // }
  };

  const clear = () => {
    setPostData(postInitialValues);
    setfiles(undefined);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
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
          onChange={handleChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.description}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={handleChange}
        />
        <FileInputWrapper>
          <input
            type="file"
            name="file-input"
            id="file-input"
            className="file-input__input"
            ref={fileRef}
            multiple
            onChange={handleSubmitFileChange}
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
