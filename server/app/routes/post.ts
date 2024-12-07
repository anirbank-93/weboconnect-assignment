import express,
{
  Request,
  Response
} from "express";

const router = express.Router();

// Controllers
import { getPosts, createPost } from "../controllers/post.controller";

router.get("/", getPosts);
router.post("/", createPost);


export default router;