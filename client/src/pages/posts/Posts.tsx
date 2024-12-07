"use client";

import React from "react"
import { useEffect } from "react";
// import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, styled } from "@mui/material";
import Grid from "@mui/material/Grid";

// Redux actions
// import { getPosts } from '@/redux/actions/postAction';

// Components
import Post from "./[id]/Post";

type PostType = {
  file: string;
  creator?: string;
  createdAt: string | Date;
  tags: string[];
  title: string;
  likes: number;
};

type PostProps = {
  post?: PostType;
};

const Container = styled(Grid)`
  display: flex;
  align-items: stretch;
`;

const Posts: React.FC = () => {
  // const { posts } = useSelector((state) => state.getPosts);
  //console.log(posts, 'posts');

  // const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getPosts());
  //   }, [dispatch]);

  return (
    <Container container spacing={3}>
      <Post />
    </Container>
  );
  // return posts.length > 0 ? (
  //   <Container container spacing={3}>
  //     {posts.map((item, index) => (
  //       <Grid item key={index} xs={12} sm={6}>
  //         <Post post={item} />
  //       </Grid>
  //     ))}
  //   </Container>
  // ) : (
  //   <CircularProgress />
  // );
};

export default Posts;
