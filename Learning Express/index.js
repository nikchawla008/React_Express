const axios = require('axios');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors')

//Setting up the express() application
const app = express();
app.use(express.json());
app.use(cors());

//database configuration
const dbconfig = require('./dbconfig');

// configure mysql initial stage
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection(dbconfig);
	res.locals.connection.connect( (err) => {if (err) {throw err;}
	});
	next();
});


//APIs
showPost = require('./routes/showPosts');
fetchPosts = require('./routes/fetchPosts');
getPost = require('./routes/getPost')
delPost = require('./routes/delPost');
addPost = require('./routes/addPost');
searchPost = require('./routes/searchPost');
editPost = require('./routes/editPost');


//TO fetch all posts from the jsontypicode into database and return database
app.use('/api', fetchPosts)

// To show all posts available in database
app.use('/api', showPost);

//Get one specific post by sending id to /api/getPost/<id>
app.use('/api', getPost)

//to delete post, send the id to /api/deletePost/<id>
app.use('/api', delPost);

//to add post, send the userid, title and body using post
app.use('/api', addPost)

//Search posts by sending title to /api/searchPost/<title>
app.use('/api', searchPost);

//Edit post using put, send new title and new body as the data
app.use('/api', editPost);

/*
dummy = require('./routes/dummyFetch');
app.use('/test', dummy);
*/


var http = require('http');
module.exports = app;
var server = http.createServer(app);
server.listen(4007);


module.exports = server;




