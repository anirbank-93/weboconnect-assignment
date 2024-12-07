import express,
{
  Request,
  Response
} from "express";

const router = express.Router();

// Controllers
import { getPosts, createPost, updatePost } from "../controllers/post.controller";

router.get("/", getPosts);
router.post("/", createPost);
router.put("/:postID", updatePost);


export default router;