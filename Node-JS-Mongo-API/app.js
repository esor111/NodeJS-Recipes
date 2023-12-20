import express from "express";
import { createServer } from "http";
import { exec } from 'child_process';
import cors from "cors";
import path from "path"; 
const app = express(); 
const httpServer = createServer(app);
import { Server } from "socket.io";
import { InitializeSocketIO } from "./src/socket/index.js";
import userRoutes from "./src/routes/user.route.js"
import redisClient from "./src/routes/redis.route.js"
import os from "os";

app.use(express.json({ limit: "16kb" }));

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.set("io", io);

// Use path.join to create an absolute path
const indexPath = path.join(new URL('.', import.meta.url).pathname, 'index.html');
 
app.get('/man', (req, res) => {
  res.sendFile(indexPath);
});

app.get('/version', async (req, res) => {
  try {
    // Retrieve Node.js version and OS details
    const nodeVersionInfo = {
      nodeVersion: process.version,
      platform: os.platform(),
      architecture: os.arch(),
      release: os.release(),
    };

    // Execute the script using promisify
    const { stdout } = await exec('./flutter_version.sh');

    console.log(`Script output: ${stdout}`);
    res.send({ stdout, nice: 'late' });
  } catch (error) {
    console.error(`Error executing the script: ${error}`);
    res.status(500).send('Internal Server Error');
  }
});
 

app.use('/users', userRoutes);
app.use('/redis', redisClient);

app.get('/create', (req, res) => {
const randomdata= Math.random()*1000;

exec(`./create_date_file.sh ${randomdata}`, (error, stdout, stderr) => {
  if (error) {
      console.error(`Error executing the script: ${error}`);
      return res.status(500).send('Internal Server Error');
  }
  console.log(`Script output: ${stdout}`);
  res.send({stdout:stdout, nice: "adfadasdfh"});
});

});



app.get('/create/:name', (req, res) => {
  exec(`./create_folder.sh ${req.params.name}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing the script: ${error}`);
        return res.status(500).send('Internal Server Error');
    }
  
    res.send({nice: "adfadasdfh"});
  });
  
  });
  


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

InitializeSocketIO(io);

export { httpServer };