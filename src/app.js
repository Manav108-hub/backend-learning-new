import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"
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


// we cant directly import the routes , so we need to use a middleware for importing it and redirecting the routes 
app.use("/api/v1/users" , userRoutes) // so it will look like http://localhost:5000/api/v1/users/register or /login 


export { app };
