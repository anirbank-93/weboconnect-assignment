"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

// Utils
import { toast } from "react-hot-toast";

// Models
import { ApiFuncArgProps } from "@/models/apiFuncHelpers";

// Typeguards
import { isApiErrorResponse } from "@/helpers/typeguards";

// Api function
import { ApiHelperFunction } from "@/helpers/api_helpers";

// Redux actions
import { getAllPosts } from "@/redux/slices/postSlice";

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

interface FormProps {
  currentId: number | undefined;
}
interface PostAttrs {
  creator?: string;
  title?: string;
  message?: string;
  tags?: string;
  pictures?: string;
}

const postInitialValues = {
  creator: "",
  title: "",
  message: "",
  tags: "",
  pictures: "",
};

let createError = {
  title: "",
  pictures: "",
};

const Form = ({ currentId }: FormProps) => {
  const dispatch = useAppDispatch();
  const [postData, setPostData] = useState<PostAttrs>(postInitialValues);
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setfiles] = useState<File | undefined>(undefined);
  const [errors, seterrors] = useState(createError);

  // Redux stores
  const { posts } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (currentId && posts.data.length > 0) {
      let selectedPost = posts.data.find((item) => item.id == currentId);
      setPostData((prev) => {
        let updated = JSON.parse(JSON.stringify(prev));
        updated.creator = selectedPost?.user_id;
        updated.title = selectedPost?.title;
        updated.message = selectedPost?.message;
        updated.tags = selectedPost?.tags;
        return updated;
      });
    }
  }, [currentId]);

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
        pictures: "Uploaded file can't be more than 5mb",
      });
    } else {
      setfiles(files);
      seterrors({ ...errors, pictures: "" });
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
      let bodyData = {
        ...postData,
      };

      if (files) {
        const DATA = new FormData();

        // for (let i: number = 0; i < attachmentFiles.length; i++) {
        //   DATA.append("files", attachmentFiles[i]);
        // }
        DATA.append("image", files);

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
          bodyData.pictures = imgUpRes.data.imageUrl;
        } else {
          console.log("Unexpected image upload response:", imgUpRes);
        }
      }

      let requestConfig: ApiFuncArgProps;

      if (currentId) {
        requestConfig = {
          urlPath: `/posts/${currentId}`,
          method: "PUT",
          data: bodyData,
          role: "privileged",
        };
      } else {
        requestConfig = {
          urlPath: "/posts",
          method: "POST",
          data: bodyData,
          role: "privileged",
        };
      }

      let response = await ApiHelperFunction(requestConfig);

      if (isApiErrorResponse(response)) {
        toast.error(response.error.message);
      } else if (response.data) {
        setPostData(postInitialValues);
        setfiles(undefined);
        if (fileRef.current) {
          fileRef.current.value = "";
        }
        seterrors(errors);
        dispatch(getAllPosts());
        toast.success("Submitted successfully.");
      } else {
        console.log("Unexpected response:", response);
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
        <Typography variant="h6">
          {currentId !== undefined ? "Updating A Memory" : "Creating A Memory"}
        </Typography>
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
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
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
