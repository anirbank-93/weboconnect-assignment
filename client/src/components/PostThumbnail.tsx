"use client";

import React from 'react';
import { useAppDispatch } from "@/redux/hooks";

// Models
import { PostDataModel } from "@/models/constants/dataModel";

// Utils
import moment from 'moment';
import { toast } from "react-hot-toast";

// Typeguards
import { isApiErrorResponse } from "@/helpers/typeguards";

// Api function
import { ApiHelperFunction } from "@/helpers/api_helpers";

// Redux actions
import { getAllPosts } from "@/redux/slices/postSlice";

// Components
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  styled,
} from '@mui/material';
import { ThumbUpAlt, Delete, MoreHoriz } from '@mui/icons-material';
import { ApiFuncArgProps } from '@/models/apiFuncHelpers';

let imgBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Component = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  height: 100%;
  position: relative;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
`;

const Creator = styled('div')({
  position: 'absolute',
  top: 20,
  left: 20,
  color: 'white',
});

const StyledHorizBtnContainer = styled('div')({
  position: 'absolute',
  top: 20,
  right: 20,
  color: 'white',
});

const PostDetails = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  margin: 20,
});

const PostTitle = styled(Typography)`
  padding: 0 16px;
`;

const PostActions = styled(CardActions)`
  padding: 0 16px 8px 16px;
  display: flex;
  justify-content: space-between;
`;

type PostProps = {
  post?: PostDataModel;
  setcurrentId: React.Dispatch<React.SetStateAction<number|undefined>>;
};

const PostThumbnail: React.FC<PostProps> = ({ post, setcurrentId }) => {
  const dispatch = useAppDispatch();

  const deletePost = async (id:number|undefined) => {
    if (id) {
      let response = await ApiHelperFunction({
        urlPath: `/posts/${id}`,
        method: "DELETE",
        role: "privileged",
      } as ApiFuncArgProps);

      if (isApiErrorResponse(response)) {
        toast.error(response.error.message);
      } else if (response.data) {
        setcurrentId(undefined);
        dispatch(getAllPosts());
        toast.success("Deleted successfully.");
      } else {
        console.log("Unexpected response:", response);
      }
    }
  }

  const likePost = async (id:number|undefined) => {
    console.log(id);
    
    if (id) {
      console.log("here");
      
      let response = await ApiHelperFunction({
        urlPath: `/posts/likePost/${id}`,
        method: "PATCH",
        role: "privileged",
      } as ApiFuncArgProps);

      if (isApiErrorResponse(response)) {
        toast.error(response.error.message);
      } else if (response.data) {
        setcurrentId(undefined);
        dispatch(getAllPosts());
        // toast.success("Liked successfully.");
      } else {
        console.log("Unexpected response:", response);
      }
    }
  }

  return (
    <Component>
      <StyledCardMedia image={imgBaseUrl ? imgBaseUrl+post?.pictures : ""} />
      <Creator>
        <Typography variant="h6">
          {post?.user_id || 'Anonymous'}
        </Typography>
        <Typography variant="body2">
          {moment(post?.createdAt).fromNow() || ""}
        </Typography>
      </Creator>

      <StyledHorizBtnContainer>
        <Button style={{ color: 'white' }} size="small" onClick={() => setcurrentId(post?.id)} >
          <MoreHoriz />
        </Button>
      </StyledHorizBtnContainer>

      <PostDetails>
        <Typography variant="body2" color="textSecondary">
          {post?.tags.split(",").map((item) => `#${item} `)}
        </Typography>
        <CardContent>
          <PostTitle variant="h5" gutterBottom>
            {post?.title}
          </PostTitle>
        </CardContent>
        <PostActions>
          <Button size="small" color="primary" onClick={() => likePost(post?.id)}>
            <ThumbUpAlt fontSize="small" />
            Like&nbsp;
            {post?.likeCount}
          </Button>
          <Button size="small" color="primary" onClick={() => deletePost(post?.id)}>
            <Delete fontSize="small" />
            Delete
          </Button>
        </PostActions>
      </PostDetails>
    </Component>
  );
};

export default PostThumbnail;
