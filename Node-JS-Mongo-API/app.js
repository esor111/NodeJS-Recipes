import express from "express"
import { createServer } from "http";   
import cors from "cors"
const app=express()   
const httpServer= createServer(app)
import { Server } from "socket.io";
 
app.use(express.json({ limit: "16kb" }));
  
// const io = new Server(httpServer, {
//   pingTimeout: 60000,
//   cors: {
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   },
// });

// app.set("io", io);

app.use("/", (req, res)=>{
  res.json("this is fish man")
})
app.use(
   cors({
     origin: process.env.CORS_ORIGIN,
     credentials: true,
   })
 );

//  const limiter = rateLimit({
//    windowMs: 15 * 60 * 1000, // 15 minutes
//    max: 500, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
//    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//    handler: (_, __, ___, options) => {
//      throw new ApiError(
//        options.statusCode || 500,  
//        `There are too many requests. You are only allowed ${
//          options.max
//        } requests per ${options.windowMs / 60000} minutes`
//      );
//    },
//  });

// app.use(limiter)

// InitializeSocketIO(io);

export { httpServer };