"use strict";

const mongodb = require("mongodb");
const { connect } = require("mongoose");

const MongoClient = mongodb.MongoClient;

const connectionString = "mongodb://localhost:27017/";

MongoClient.connect(
  connectionString,
  { autoReconnect: true },
  (err, database) => {
    if (err) {
      console.log("Failed to connect.", err.message);
      process.exit(1);
    }
    console.log;
  }
);
