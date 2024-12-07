"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Redux actions
import { getAllPosts } from "@/redux/slices/postSlice";

// Components
import {
  // CircularProgress,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import PostThumbnail from "../../components/PostThumbnail";

const Container = styled(Grid)`
  display: flex;
  align-items: stretch;
`;

type PostsProps = {
  setcurrentId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const page: React.FC<PostsProps> = ({ setcurrentId }) => {
  const dispatch = useAppDispatch();

  // Redux stores
  const { posts } = useAppSelector((state) => state.posts);
  console.log(posts);

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
          <PostThumbnail post={item} setcurrentId={setcurrentId} />
        </Grid>
      ))}
    </Container>
  ) : (
    // <CircularProgress />
    <div style={{ fontSize: 80 }}>No posts...</div>
  );
};

export default page;
