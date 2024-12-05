import express from //Request,
//Response
"express";

import postRoute from "./post";

const route = express.Router();

// route.get("/", async (req: Request, res: Response) => {
//   res.send("Express is workin'");
// });

route.use("/api/posts", postRoute);

export default route;
