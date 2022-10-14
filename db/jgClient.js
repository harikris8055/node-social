/**
 * 
 * File: janusGraphClient.js
 * Project: sevenchats_backend
 * Copyright (c) 2021 All rights reserved
 * -----------------------------------------
 * 
 */


/**
 *  Libraries Imported
 * -------------------
 * Gremlin - gremlin
 * Gremlin Process Statics - gremlin.process.statics
 * Graph - gremlin.structure.Graph
 * DriverRemoteConnection - gremlin.driver.DriverRemoteConnection
 * traversal - gremlin.process.AnonymousTraversalSource.traversa
 * Logger - ./logger
 * dotenv - dotenv
 */
 const gremlin = require('gremlin');
 const __ = gremlin.process.statics;
 
 //const Graph = gremlin.structure.Graph;
 const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
 const traversal = gremlin.process.AnonymousTraversalSource.traversal;
 const dotenv = require('dotenv');
 
 dotenv.config();
 
 
 //const graph = new Graph();
 

 /**
  * Get Settings from environment
  */
 const port = normalizePort(process.env.JANUSGRAPH_PORT || 8182);
 const host = process.env.JANUSGRAPH_HOSTNAME || "localhost";
 const timeout = process.env.TIMEOUT || 15000;
 const errorThresholdPercentage = process.env.ERROR_THRESHOLD_PERCENTAGE || 50;
 const resetTimeout = process.env.RESET_TIMEOUT || 5;

 const connection = new DriverRemoteConnection('ws://' + host + ':' + port + '/gremlin');
 //const g = graph.traversal().withRemote(connection);
 const g = traversal().withRemote(connection);

 console.info('Establishing connection, JanusGraph on ws://' + host + ':' + port + '/gremlin')
 
 const opossumOptions = {
   timeout: timeout, // If our function takes longer than timeout seconds, trigger a failure
   errorThresholdPercentage: errorThresholdPercentage, // When errorThresholdPercentage of requests fail, trip the circuit
   resetTimeout: resetTimeout, // After resetTimeout seconds, try again.
 };
 
 /**
  * Normalize a port into a number, string, or false.
  */
 function normalizePort(val) {
   //logger.setFuntioName('normalizePort');
   const port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 // exports the variable above so that other modules can use them
 //module.exports.graph = graph;
 module.exports.g = g;
 module.exports.opossumOptions = opossumOptions;
 module.exports.gremlinProcessStatics = __;
 //module.exports.connection = connection;
 