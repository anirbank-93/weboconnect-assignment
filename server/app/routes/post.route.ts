import express,
{
  Request,
  Response
} from "express";

const router = express.Router();

// Controllers
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/post.controller";

router.get("/", getPosts);
router.post("/", createPost);
router.put("/:postID", updatePost);
router.delete("/:postID", deletePost);
router.patch("/likePost/:postID", likePost);


export default router;