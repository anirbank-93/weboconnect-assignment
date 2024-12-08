import express, { Request, Response } from "express";
import multer from "multer";
import { uploadImage } from "../utils/fileUpload.utils"

import postRoute from "./post.route";
import userRoute from "./user.route";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// route.get("/", async (req: Request, res: Response) => {
//   res.send("Express is workin'");
// });

router.post(
    "/api/upload-image",
    upload.single("image") as unknown as express.RequestHandler,
    async (req: Request, res: Response) => {
      try {
        if (req.file == null || typeof req.file == "undefined") {
          return res.status(400).send({
            status: false,
            error: {
              msg: "FILE_IS_EMPTY",
              param: "file",
              location: "images",
            },
          });
        }
      //   if (req.file.mimetype != "image/jpg") {
      //     return res.status(422).send({
      //       status: false,
      //       error: {
      //         msg: "FILE_IS_NOT_IMAGE_TYPE",
      //         param: "file",
      //         location: "image",
      //       },
      //     });
      //   }
  
        const fileUrl = await uploadImage(req, res);
  
        return res.status(201).json({ status: true, imageUrl: fileUrl });
      } catch (error: any) {
        return res.status(500).json({
          status: false,
          message: "Failed to upload image.",
          error: {
            msg: error.message,
            param: "file",
            location: "images",
          },
        });
      }
    }
  );

router.use("/api/posts", postRoute);
router.use("/api/user", )

export default router;
