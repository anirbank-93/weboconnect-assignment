"use client";

import React from 'react';

// Model
import { PostDataModel } from "@/models/constants/dataModel";

// Utils
import moment from 'moment';

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

let imgBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type PostProps = {
  post?: PostDataModel;
};

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

const Post = ({ post }: PostProps) => {
  return (
    <Component>
      <StyledCardMedia image={imgBaseUrl ? imgBaseUrl+post?.pictures : ""} />
      <Creator>
        <Typography variant="h6">
          {post?.creator || 'Anonymous'}
        </Typography>
        <Typography variant="body2">
          {moment(post?.createdAt).fromNow() || ""}
        </Typography>
      </Creator>

      <StyledHorizBtnContainer>
        <Button style={{ color: 'white' }} size="small" onClick={() => {}}>
          <MoreHoriz />
        </Button>
      </StyledHorizBtnContainer>

      <PostDetails>
        <Typography variant="body2" color="textSecondary">
          {post?.tags.map((item, idx) => `#${item} `)}
        </Typography>
        <CardContent>
          <PostTitle variant="h5" gutterBottom>
            {post?.title}
          </PostTitle>
        </CardContent>
        <PostActions>
          <Button size="small" color="primary" onClick={() => {}}>
            <ThumbUpAlt fontSize="small" />
            Like&nbsp;
            {post?.likes}
          </Button>
          <Button size="small" color="primary" onClick={() => {}}>
            <Delete fontSize="small" />
            Delete
          </Button>
        </PostActions>
      </PostDetails>
    </Component>
  );
};

export default Post;
