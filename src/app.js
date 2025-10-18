import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

//cross origin regions
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);

//json accept
app.use(
  express.json({
    limit: "16kb",
  })
);

//url encoders
app.use(
  express.urlencoded({
    extended: true, // to accept nested body
    limit: "16kb",
  })
);
// to accept static files
app.use(express.static("public"))

//cookies
app.use(cookieParser())
export { app };
