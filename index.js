// import dotenv
// loads env variable
require("dotenv").config(); 

// import express
const express = require("express");

// import cors
const cors = require("cors");

// import router
const routes = require("./routes");

// import MongoDB connection file
require("./connection");

// Application-specific Middleware
// const appmiddleware = require("./middleware/appMiddleware");

// create server using express
const globoServer = express();

// connect server with frontend using cors
globoServer.use(cors());

// parse json format of data received at the server side - json()
// parse data from frontend
globoServer.use(express.json());

// Application-specific Middleware
// globoServer.use(appmiddleware);

// connect to routes file
globoServer.use(routes);

// static() is used to export a file/folder from the server-side.
globoServer.use('/uploads', express.static('./uploads'))

// set port for the server to run
const PORT = 4000 || process.env.PORT;

// listen to the request received at the particular port
globoServer.listen(PORT, () => {
  console.log(`Server running successfully at PORT NUMBER: ${PORT}`);
});
