"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Redux actions
import { getAllPosts } from "@/redux/slices/postSlice";

// Components
import { CircularProgress, styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import Post from "./[id]/Post";

const Container = styled(Grid)`
  display: flex;
  align-items: stretch;
`;

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();

  // Redux stores
  const { posts } = useAppSelector((state) => state.posts);
  console.log(posts, 'posts');

    useEffect(() => {
      dispatch(getAllPosts());
    }, []);

  // return (
  //   <Container container spacing={3}>
  //     <Post />
  //   </Container>
  // );
  return posts?.data?.length > 0 ? (
    <Container container spacing={3}>
      {posts?.data?.map((item, index) => (
        <Grid item key={index} xs={12} sm={6}>
          <Post post={item} />
        </Grid>
      ))}
    </Container>
  ) : (
    // <CircularProgress />
    <div style={{fontSize:80}}>No posts...</div>
  );
};

export default Posts;
