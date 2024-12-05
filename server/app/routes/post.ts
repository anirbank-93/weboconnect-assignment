import express,
{
  Request,
  Response
} from "express";

const router = express.Router();

// Controllers
import { getPosts } from "../controllers/post.controller";

router.get("/", getPosts);


export default router;